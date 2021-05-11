const fs = require('fs-extra');
// const esbuild = require('esbuild');

// esbuild
//   .build({
//     entryPoints: ['../src/interventions/youtube/content.ts', '../src/utils.ts'],
//     format: 'iife',
//     outdir: '../dist',
//     target: 'es2020',
//   })
//   .catch(() => process.exit(1));

fs.copy('../manifest.json', '../dist/manifest.json')
  .then(() => console.log('manifest copied!'))
  .catch((err) => console.error(err));

fs.copy(
  '../src/interventions/youtube/content.css',
  '../dist/interventions/youtube/content.css'
)
  .then(() => console.log('youtube content.css!'))
  .catch((err) => console.error(err));
