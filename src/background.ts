function handleInstalled(details) {
  console.log(details.reason);

  // First install
  if (!details.reason || details.reason === 'install') {
    const openingPage = browser.runtime.openOptionsPage();
  }

  // Extension update
  if (
    details.reason === 'update' ||
    details.reason === 'shared_module_update'
  ) {
    // Show changelog?
    // const openingPage = browser.runtime.openOptionsPage();
  }
}

function handleIconClick() {
  browser.runtime.openOptionsPage();
}

browser.runtime.onInstalled.addListener(handleInstalled);

browser.browserAction.onClicked.addListener(handleIconClick);
