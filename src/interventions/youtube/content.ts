/* global patchOrAddPatchCSS documentReady setOrDeleteDataAttr setDataAttrsObj generateConfigWithProfiles */

import { defaultYouTubeConfig, profiles } from './defaults';
import type { YoutubeSettings } from './types';
import { profileNames } from './types';

type Config = YoutubeSettings;
const configKey = 'youtubeConfig';

const docEl = document.documentElement;

function dynamicLimitHomeRecommendations(recommendationNum: number) {
  const css = (num: number) => `
[data-is-active][data-recommendations-home-state="limited"] ytd-rich-item-renderer:nth-child(n + ${
    +num + 1
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
function startOnDOMLoaded(config: Config) {
  if (config.recommendationsHomeState === 'limited') {
    if (config.recommendationsHomeLimitedNum) {
      dynamicLimitHomeRecommendations(config.recommendationsHomeLimitedNum);
    }
  }
}

function setup(state: Config) {
  if (state.isActive) {
    setDataAttrsObj(docEl, state);
    documentReady(() => startOnDOMLoaded(state));
  } else {
    setOrDeleteDataAttr(docEl, 'isActive', false);
  }
}

function onStorageChanged(changes: { [configKey]?: { newValue: Config } }) {
  if (!changes?.[configKey]?.newValue) return;

  console.log('logStorageChange', changes);

  const newStoredConfig = changes[configKey]!.newValue;
  const newConfig: Config = {
    ...defaultYouTubeConfig,
    ...newStoredConfig,
  };
  const conf = generateConfigWithProfiles(
    newConfig,
    defaultYouTubeConfig,
    profileNames,
    profiles
  );
  setup(conf);
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
    ...defaultYouTubeConfig,
    ...storedConfig[configKey],
  };
  const newConfig = generateConfigWithProfiles(
    config,
    defaultYouTubeConfig,
    profileNames,
    profiles
  );
  setup(newConfig);
}

main();
