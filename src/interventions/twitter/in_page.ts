console.log('here we limit infinite scroll');
const maximum_tweets = 4;
const tweet_count = {};

const responseMayContainTimelineEvents = (url: string) => {
  const IGNORE_PATTERNS = [
    '/client_event',
    '/badge_count',
    '/update_subscription',
    '/events',
  ];

  if (!url.includes('api.twitter.com') && !url.includes('twitter.com')) {
    return false;
  }
  IGNORE_PATTERNS.forEach((pattern) => {
    if (url.includes(pattern)) {
      return false;
    }
  });

  return true;
};

const responseContainsJSON = (xhr: XMLHttpRequest) => {
  const content_type = xhr.getResponseHeader('content-type');
  if (!content_type) return false;
  return content_type.startsWith('application/json');
};

const entryIsTweet = () => true;
const entryHasNestedTimelineModule = () => true;

const filter_timeline_items = (timeline_id: string, items) => {
  console.log('timeline_id', timeline_id);
  console.log('items', items);
  return items.filter((entry) => {
    if (!entryIsTweet(entry)) return false;
    if (entryHasNestedTimelineModule(entry)) {
      return true;
    } else {
      tweet_count[timeline_id] += 1;
      if (tweet_count[timeline_id] > maximum_tweets) {
        console.log(
          `Timeline ${timeline_id} had more than ${maximum_tweets} tweets: removing entry with ID ${entry['entryId']}`
        );
        return false;
      } else {
        console.log(
          `Timeline ${timeline_id} now has ${tweet_count[timeline_id]} tweets.`
        );
        return true;
      }
    }
  });
};

const interceptTimelineMessage = (encoded_data: string, url: string) => {
  let data;
  try {
    data = JSON.parse(encoded_data);
  } catch (e) {
    console.log(`Failed to parse JSON content of message from ${url}: ${e}`);
    return null;
  }

  if ('timeline' in data) {
    const timeline_id = data['timeline']['id'];
    const instructions = data['timeline']['instructions'];
    console.log(
      `Found timeline id ${timeline_id} with ${instructions.length} instructions.`
    );

    if (!(timeline_id in tweet_count)) {
      tweet_count[timeline_id] = 0;
    }

    if (instructions && instructions.length) {
      console.log('instructions', instructions);

      instructions.forEach((command) => {
        console.log(`Found ${JSON.stringify(command)} command`);
        if ('addEntries' in command) {
          const command_data = command['addEntries'];
          command_data['entries'] = filter_timeline_items(
            timeline_id,
            command_data['entries']
          );
        }
      });
    }

    return JSON.stringify(data);
  } else {
    console.log(`Didn't find a timeline in data (keys: ${Object.keys(data)})`);
    return null;
  }
};

const interceptResponseText = (xhr: XMLHttpRequest) => {
  function getter() {
    delete xhr.responseText;
    const data = xhr.responseText;
    setup();

    const timestamp = window.performance.now() / 1000.0;
    console.log(`${timestamp}: Intercepted message from ${xhr.__jomo_url}`);

    if (
      responseMayContainTimelineEvents(xhr.__jomo_url) &&
      responseContainsJSON(xhr)
    ) {
      console.log(`Modifying response from ${xhr.__jomo_url}`);
      const new_data = interceptTimelineMessage(data, xhr.__jomo_url);

      if (new_data) {
        return new_data;
      }
    }

    return data;
  }

  function setter(str: string) {
    console.log('set responseText: %s', str);
  }

  function setup() {
    Object.defineProperty(xhr, 'responseText', {
      get: getter,
      set: setter,
      configurable: true,
    });
  }
  setup();
};

const interceptGlobalXMLHttpRequest = () => {
  if (XMLHttpRequest.prototype.__jomo) {
    console.log(
      'XMLHttpRequest is already patched. Refusing to double-patch to avoid infinite recursion.'
    );
    return;
  }

  XMLHttpRequest.prototype.__jomo = true;
  XMLHttpRequest.prototype.__jomo_open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.__jomo_send = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function (
    method,
    url,
    async = true,
    user,
    password
  ) {
    this.__jomo_method = method;
    this.__jomo_url = url;
    return this.__jomo_open(method, url, async || true, user, password);
  };

  XMLHttpRequest.prototype.send = function (vData) {
    if (this.onreadystatechange) {
      this.__onreadystatechange = this.onreadystatechange;
    }

    this.onreadystatechange = function () {
      // INSPECT CONTENTS
      try {
        interceptResponseText(this);
      } catch (e) {
        console.log(`Failed to parse response data: ${e}`);
      }

      if (this.__onreadystatechange) {
        this.__onreadystatechange.apply(this, arguments);
      }
    };

    this.__jomo_send(vData);
  };
};

function main() {
  interceptGlobalXMLHttpRequest();
}

main();
