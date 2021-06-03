/* global documentReady */
const docEl = document.documentElement;

const injectScript = (url: string) => {
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.setAttribute('id', 'jomo-inpage');
  script.setAttribute('src', url);
  document.getElementsByTagName('body')[0].appendChild(script);
};

function main() {
  docEl.dataset.isActive = 'true';
  const scriptUrl = browser.runtime.getURL('interventions/twitter/in_page.js');
  documentReady(() => injectScript(scriptUrl));
}

main();
