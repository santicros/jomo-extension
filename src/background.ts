function handleInstalled(details) {
  console.log(details.reason);

  // First install
  if (!details.reason || details.reason === 'install') {
    // Go to welcome with options
    //   browser.tabs.create({
    //     url: 'https://example.com',
    //   });
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

browser.runtime.onInstalled.addListener(handleInstalled);
