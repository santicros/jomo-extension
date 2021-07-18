const fs = require('fs-extra');

fs.copy('manifest.json', 'dist/manifest.json')
  .then(() => console.log('manifest copied!'))
  .catch((err) => console.error(err));

fs.copy('src/assets/icons/icon.png', 'dist/assets/icons/icon.png')
  .then(() => console.log('icon copied!'))
  .catch((err) => console.error(err));

fs.copy(
  'node_modules/webextension-polyfill/dist/browser-polyfill.min.js',
  'dist/browser-polyfill.min.js'
)
  .then(() => console.log('polyfill copied!'))
  .catch((err) => console.error(err));
