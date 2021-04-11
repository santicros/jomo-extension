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

function addCSS(id, css) {
  if (document.getElementById(id)) return;
  const style = document.createElement('style');
  document.head.appendChild(style);
  style.type = 'text/css';
  style.id = id;
  style.appendChild(document.createTextNode(css));
}

function patchCSS(id, css) {
  const style = document.getElementById(id);
  if (!style) return;

  style.replaceChild(
    document.createTextNode(css),
    style.childNodes[0],
  );
}

function patchOrAddPatchCSS(id, css) {
  const style = document.getElementById(id);
  if (!style) { addCSS(id, css); return; }
  patchCSS(id, css);
}

function dynamicLimitHomeRecommendations() {
  const css = (recommendationNum) => `
    [data-attention-active][data-home-recommendations-state="limited"] ytd-rich-item-renderer:nth-child(n + ${recommendationNum + 1
}) {
      display: none;
    }`;

  patchOrAddPatchCSS('rule-home-recommendations-to-show', css(homeRecommendationsToShow));
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
