const isActive = true;

/**
 * Home recomendations state
 * @type {"hidden" | "limited" | "visible"}
 */
const homeRecommendationsState = 'limited';
const homeRecommendationsToShow = 2;
const hideHomeFeedFilterBar = true;
const hideExploreTabSidebar = true;
const grayNotificationCount = true;

const docEl = document.documentElement;

function dynamicLimitHomeRecommendations() {
  const css = (recommendationNum) => `
  [data-attention-active][data-home-recommendations-state="limited"] ytd-rich-item-renderer:nth-child(n + ${recommendationNum + 1
}) {
    display: none;
  }`;

  const style = document.getElementById('rule-home-recommendations-to-show');

  if (!style) {
    const newStyle = document.createElement('style');
    document.head.appendChild(newStyle);
    newStyle.type = 'text/css';
    newStyle.id = 'rule-home-recommendations-to-show';
    newStyle.appendChild(
      document.createTextNode(css(homeRecommendationsToShow)),
    );
  } else {
    style.replaceChild(
      document.createTextNode(css(homeRecommendationsToShow)),
      style.childNodes[0],
    );
  }
}

/**
 * Main function executed before DOM loaded
 */
function startBeforeDOMLoaded() {
  docEl.dataset.attentionActive = true;
}

/**
 * Main executed after DOM loaded
 */
function startOnDOMLoaded() {
  if (homeRecommendationsState === 'limited') {
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

if (homeRecommendationsState) {
  docEl.dataset.homeRecommendationsState = homeRecommendationsState;
}
if (hideHomeFeedFilterBar) {
  docEl.dataset.hideHomeFeedFilterBar = true;
} else {
  delete docEl.dataset.hideHomeFeedFilterBar;
}
if (hideExploreTabSidebar) {
  docEl.dataset.hideExploreTabSidebar = true;
} else {
  delete docEl.dataset.hideExploreTabSidebar;
}
if (grayNotificationCount) {
  docEl.dataset.grayNotificationCount = true;
} else {
  delete docEl.dataset.grayNotificationCount;
}
