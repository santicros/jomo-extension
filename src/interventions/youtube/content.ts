/* global patchOrAddPatchCSS */

import { browser } from 'webextension-polyfill-ts';

import { defaultYouTubeConfig } from './defaults';
import { YoutubeSettings } from './types';

const docEl = document.documentElement;

function dynamicLimitHomeRecommendations(recommendationNum: number) {
  const css = (num: number) => `
[data-attention-active][data-recommendations-home-state="limited"] ytd-rich-item-renderer:nth-child(n + ${
    num + 1
  }) {
display: none;
}`;

  patchOrAddPatchCSS(
    'rule-home-recommendations-to-show',
    css(recommendationNum)
  );
}

/**
 * Main executed after DOM loaded
 */
function startOnDOMLoaded(config: typeof defaultYouTubeConfig) {
  if (config.recommendationsHomeState === 'limited') {
    if (config.recommendationsHomeLimitedNum)
      dynamicLimitHomeRecommendations(config.recommendationsHomeLimitedNum);
  }
}

/**
 * Util to add or delete data attr
 */
function setOrDeleteDataAttr(name: string, value: number | boolean | string) {
  // If value is false, null,... we remove it
  if (!value) {
    delete docEl.dataset[name];
    return;
  }
  docEl.dataset[name] = String(value);
}

function setDataAttrsObj(configObj: YoutubeSettings) {
  Object.entries(configObj).forEach(([key, value]) => {
    setOrDeleteDataAttr(key, value);
  });
}

function setup(state: typeof defaultYouTubeConfig) {
  if (state.isActive) {
    setDataAttrsObj(state);
    if (document.readyState === 'complete') {
      startOnDOMLoaded(state);
    } else {
      document.addEventListener('DOMContentLoaded', () =>
        startOnDOMLoaded(state)
      );
    }
  } else {
    setOrDeleteDataAttr('isActive', false);
  }
}

function logStorageChange(changes) {
  console.log('logStorageChange', changes);
  let changedItems = Object.keys(changes);
  for (let item of changedItems) {
    console.log(item + ' has changed. New value:');
    console.log(changes[item].newValue);
  }

  const newStoredConfig = changes.youtubeConfig.newValue;
  const newConfig = {
    ...defaultYouTubeConfig,
    ...newStoredConfig,
  };
  setup(newConfig);
}

async function main() {
  let storedConfig;
  try {
    storedConfig = await browser.storage.sync.get('youtubeConfig');
  } catch (error) {
    console.error(error);
  }

  browser.storage.onChanged.addListener(logStorageChange);

  if (!storedConfig) return;

  if (storedConfig) {
    const config = { ...defaultYouTubeConfig, ...storedConfig.youtubeConfig };
    setup(config);
  }
}

main();
