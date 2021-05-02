const checkBox = document.getElementById('isActive');

browser.storage.local.get('youtubeIsActive').then(setStatePopup);

function setStatePopup(state) {
  console.log('set', state);
  if (state.youtubeIsActive === true) {
    console.log('true');
  } else if (state.youtubeIsActive === false) {
    console.log('false');
  }
}

function onToggle(e) {
  console.log(e);
  browser.storage.local.set({ youtubeIsActive: true });
}

if (checkBox) {
  checkBox.addEventListener('click', onToggle);
}
