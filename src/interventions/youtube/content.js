const isActive = true;

/**
 * Home recomendations state
 * @type {"hidden" | "limited" | "visible"}
 */
const homeRecommendationsState = 'limited';
const homeRecommendationsToShow = 3;
const hideHomeFeedFilterBar = true;
const hideExploreTabSidebar = true;
const grayNotificationCount = true;

function limitHomeRecommendations() {
  // console.log("loaded", event)
  // console.log("styleSheets", window.document.styleSheets)
  const sheet = window.document.styleSheets[5];
  sheet.insertRule(
    `[data-attention-active] ytd-rich-item-renderer:nth-child(n + ${homeRecommendationsToShow + 1
    }) {
              display: none;
        }`,
    0,
  );
}

/**
 * Main function executed before DOM loaded
 */
function startBeforeDOMLoaded() {
  document.documentElement.dataset.attentionActive = true;
}

/**
 * Main executed after DOM loaded
 */
function startOnDOMLoaded() {
  if (homeRecommendationsState === 'limited') {
    limitHomeRecommendations();
  }
}

if (isActive) {
  startBeforeDOMLoaded();
  document.addEventListener('DOMContentLoaded', startOnDOMLoaded);
}

if (homeRecommendationsState !== 'visible') { document.documentElement.dataset.homeRecommendationsState = homeRecommendationsState; }
if (hideHomeFeedFilterBar) document.documentElement.dataset.hideHomeFeedFilterBar = true;
if (hideExploreTabSidebar) document.documentElement.dataset.hideExploreTabSidebar = true;
if (grayNotificationCount) document.documentElement.dataset.grayNotificationCount = true;
