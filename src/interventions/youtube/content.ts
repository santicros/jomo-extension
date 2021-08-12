/* global patchOrAddPatchCSS documentReady setOrDeleteDataAttr */

import { defaultYouTubeConfig, profiles } from './defaults';
import { profileNames, YoutubeSettings } from './types';

const docEl = document.documentElement;

function dynamicLimitHomeRecommendations(recommendationNum: number) {
  const css = (num: number) => `
[data-is-active][data-recommendations-home-state="limited"] ytd-rich-item-renderer:nth-child(n + ${
    num + 1
  }) {
display: none;
}`;

  patchOrAddPatchCSS(
    'rule-home-recommendations-to-show',
    css(recommendationNum)
  );
}

function generateConfigWithProfiles(config: typeof defaultYouTubeConfig) {
  let configWithProfiles = {
    ...defaultYouTubeConfig,
    ...config,
  };

  profileNames.forEach((profileName) => {
    const profileStatus = config[profileName];
    if (profileStatus && profileStatus !== 'custom') {
      const profile = profiles[profileName];
      configWithProfiles = {
        ...configWithProfiles,
        ...profile[profileStatus],
      };
    }
  });

  return configWithProfiles;
}

/**
 * Main executed after DOM loaded
 */
function startOnDOMLoaded(config: typeof defaultYouTubeConfig) {
  if (config.recommendationsHomeState === 'limited') {
    if (config.recommendationsHomeLimitedNum) {
      dynamicLimitHomeRecommendations(config.recommendationsHomeLimitedNum);
    }
  }
}

function setDataAttrsObj(configObj: YoutubeSettings) {
  Object.entries(configObj).forEach(([key, value]) => {
    setOrDeleteDataAttr(docEl, key, value);
  });
}

function setup(state: typeof defaultYouTubeConfig) {
  if (state.isActive) {
    setDataAttrsObj(state);
    documentReady(() => startOnDOMLoaded(state));
  } else {
    setOrDeleteDataAttr(docEl, 'isActive', false);
  }
}

function logStorageChange(changes) {
  console.log('logStorageChange', changes);

  const newStoredConfig = changes.youtubeConfig.newValue;
  const newConfig = {
    ...defaultYouTubeConfig,
    ...newStoredConfig,
  };
  const conf = generateConfigWithProfiles(newConfig);
  setup(conf);
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
    let config: typeof defaultYouTubeConfig = {
      ...defaultYouTubeConfig,
      ...storedConfig.youtubeConfig,
    };
    const newConfig = generateConfigWithProfiles(config);
    setup(newConfig);
  }
}

main();
