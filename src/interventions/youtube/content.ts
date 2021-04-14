// import { patchOrAddPatchCSS } from '../../utils'
const isActive = true;

type customConfig = {
  homeRecommendationsState: 'hidden' | 'limited' | 'visible';
  homeRecommendationsToShow: number;
  hideHomeFeedFilterBar: boolean;
  previewsState: 'hidden' | 'hoverImg' | 'hoverVideo' | 'visible';
  hideExploreTabSidebar: boolean;
  grayNotificationCount: boolean;
  hideCommentsSection: boolean;
};

const config: customConfig = {
  homeRecommendationsState: 'hidden',
  homeRecommendationsToShow: 6,
  hideHomeFeedFilterBar: true,
  previewsState: 'hidden',
  hideExploreTabSidebar: true,
  grayNotificationCount: true,
  hideCommentsSection: true,
};

const docEl = document.documentElement;

function dynamicLimitHomeRecommendations() {
  const css = (recommendationNum: number) => `
[data-attention-active][data-home-recommendations-state="limited"] ytd-rich-item-renderer:nth-child(n + ${
    recommendationNum + 1
  }) {
display: none;
}`;

  patchOrAddPatchCSS(
    'rule-home-recommendations-to-show',
    css(config.homeRecommendationsToShow)
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
    dynamicLimitHomeRecommendations();
  }
}

if (isActive) {
  startBeforeDOMLoaded();
  if (document.readyState === 'complete') {
    startOnDOMLoaded();
  } else {
    document.addEventListener('DOMContentLoaded', startOnDOMLoaded);
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

function setDataAttrsObj(configObj: customConfig) {
  Object.entries(configObj).forEach(([key, value]) => {
    setOrDeleteDataAttr(key, value);
  });
}

setDataAttrsObj(config);
