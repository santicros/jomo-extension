/* global patchOrAddPatchCSS */

// import { browser } from 'webextension-polyfill-ts';

import { defaultYouTubeConfig } from './defaults';
import { youtubeSettings } from './types';

let config = { ...defaultYouTubeConfig };

function gotState(state) {
  config = { ...defaultYouTubeConfig, ...state.youtubeConfig };
  setup({ youtubeIsActive: true });
  docEl.dataset.attentionActive = 'true';
}
function onError(error) {
  console.log(error);
}

// browser.storage.sync.set({ kitten, monster }).then(setItem, onError);
browser.storage.sync.get('youtubeConfig').then(gotState, onError);

const docEl = document.documentElement;

function dynamicLimitHomeRecommendations(recommendationNum: number) {
  const css = (num: number) => `
[data-attention-active][data-home-recommendations-state="limited"] ytd-rich-item-renderer:nth-child(n + ${
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
 * Main function executed before DOM loaded
 */
function startBeforeDOMLoaded() {
  docEl.dataset.attentionActive = 'true';
}

/**
 * Main executed after DOM loaded
 */
function startOnDOMLoaded() {
  if (config.homeRecommendationsState === 'limited') {
    dynamicLimitHomeRecommendations(config.homeRecommendationsLimitedShowNum);
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

function setDataAttrsObj(configObj: youtubeSettings) {
  Object.entries(configObj).forEach(([key, value]) => {
    setOrDeleteDataAttr(key, value);
  });
}

// browser.runtime.onMessage.addListener((message) => {
//   if (message.command === 'activate') {
//     console.log('activating');
//     docEl.dataset.attentionActive = 'true';
//   } else if (message.command === 'deactivate') {
//     console.log('deactivating');
//     delete docEl.dataset.attentionActive;
//   }
// });

function setup(state) {
  if (state.youtubeIsActive) {
    startBeforeDOMLoaded();
    if (document.readyState === 'complete') {
      startOnDOMLoaded();
    } else {
      document.addEventListener('DOMContentLoaded', startOnDOMLoaded);
    }
    setDataAttrsObj(config);
  }
}

// browser.storage.sync.get('youtubeIsActive').then(setup);
