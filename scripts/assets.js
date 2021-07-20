const fs = require('fs-extra');

fs.copy('manifest.json', 'dist/manifest.json')
  .then(() => console.log('manifest copied!'))
  .catch((err) => console.error(err));

try {
  fs.copySync('src/assets/icons/', 'dist/assets/icons/');
  console.log('success!');
} catch (err) {
  console.error(err);
}

fs.copy(
  'node_modules/webextension-polyfill/dist/browser-polyfill.min.js',
  'dist/browser-polyfill.min.js'
)
  .then(() => console.log('polyfill copied!'))
  .catch((err) => console.error(err));
