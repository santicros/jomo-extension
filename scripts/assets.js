const fs = require('fs-extra');

fs.copy('manifest.json', 'dist/manifest.json')
  .then(() => console.log('manifest copied!'))
  .catch((err) => console.error(err));
