const isActive = true;

/**
 * Home recomendations state
 * @type {"hidden" | "limited" | "visible"}
 */
const homeRecommendationsState = 'limited';
const homeRecommendationsToShow = 3;

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

  if (homeRecommendationsState !== 'visible') {
    document.documentElement.dataset.homeRecommendationsState = homeRecommendationsState;
  }
}

/**
 * Main executed after DOM loaded
 */
function startOnDOMLoaded() {
  if (homeRecommendationsState === 'limited') {
    limitHomeRecommendations();
  }
}

function onDOMLoaded() {
  if (!isActive) return;
  startOnDOMLoaded();
}

if (isActive) startBeforeDOMLoaded();
document.addEventListener('DOMContentLoaded', onDOMLoaded);
