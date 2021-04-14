/* eslint-disable import/no-extraneous-dependencies */

require('esbuild')
  .build({
    entryPoints: ['../src/interventions/youtube/content.ts'],
    bundle: false,
    format: 'esm',
    outfile: '../dist/interventions/youtube/content.js',
    target: 'es2020',
    define: { DEBUG: 'true' },
  })
  .catch(() => process.exit(1));
