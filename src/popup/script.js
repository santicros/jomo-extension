document.getElementById('myHeading').style.color = 'red';

const activateBtn = document.getElementById('activate');
const deactivateBtn = document.getElementById('deactivate');

function sendContentScriptMessage(command) {
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    browser.tabs.sendMessage(tabs?.[0]?.id, {
      command,
    });
  });
}

activateBtn?.addEventListener('click', () => {
  sendContentScriptMessage('activate');
});

deactivateBtn?.addEventListener('click', () => {
  sendContentScriptMessage('deactivate');
});
