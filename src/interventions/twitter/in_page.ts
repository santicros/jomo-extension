console.log('here we limit infinite scroll');

const IGNORE_URL_PATTERNS = [
  '/client_event',
  '/badge_count',
  '/update_subscription',
  '/events',
];

const responseMayContainTimelineEvents = (url: string) => {
  if (!url.includes('api.twitter.com')) return false;
  console.log('intersting url', url);

  IGNORE_URL_PATTERNS.forEach((pattern) => {
    if (url.includes(pattern)) {
      return false;
    }
  });

  return false;
};

const responseContainsJSON = (xhr) => {
  const content_type = xhr.getResponseHeader('content-type');
  if (!content_type) return false;
  return content_type.startsWith('application/json');
};

const interceptTimelineMessage = () => {
  return null;
};

const interceptResponseText = (xhr) => {
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

  function setter(str) {
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
