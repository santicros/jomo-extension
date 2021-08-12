/* global patchOrAddPatchCSS documentReady setOrDeleteDataAttr setDataAttrsObj generateConfigWithProfiles */

import { defaultTwitterConfig } from './defaults';
import type { TwitterSettings } from './types';

type Config = TwitterSettings;
const configKey = 'twitterConfig';

const docEl = document.documentElement;

const injectScript = (url: string) => {
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.setAttribute('id', 'jomo-inpage');
  script.setAttribute('src', url);
  document.getElementsByTagName('body')[0].appendChild(script);
};

function startOnDOMLoaded(config) {
  console.log('domLoaded');
}

function setup(state: Config) {
  if (state.isActive) {
    setDataAttrsObj(docEl, state);
    documentReady(() => startOnDOMLoaded(state));
  } else {
    setOrDeleteDataAttr(docEl, 'isActive', false);
  }
}

function onStorageChanged(changes: { [configKey]: { newValue: Config } }) {
  if (!changes?.[configKey]?.newValue) return;

  console.log('logStorageChange', changes);

  const newStoredConfig = changes[configKey].newValue;

  const config: Config = {
    ...defaultTwitterConfig,
    ...newStoredConfig,
  };
  setup(config);
}

async function main() {
  let storedConfig: { [configKey]: Config } | undefined;
  try {
    storedConfig = await browser.storage.sync.get(configKey);
  } catch (error) {
    console.error(error);
  }

  browser.storage.onChanged.addListener(onStorageChanged);

  if (!storedConfig) return;

  const config: Config = {
    ...defaultTwitterConfig,
    ...storedConfig[configKey],
  };

  setup(config);
  // const scriptUrl = browser.runtime.getURL('interventions/twitter/in_page.js');
  // documentReady(() => injectScript(scriptUrl));
}

main();
