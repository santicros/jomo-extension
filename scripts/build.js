/* eslint-disable import/no-extraneous-dependencies */

require('esbuild')
  .build({
    entryPoints: ['../src/interventions/youtube/content.ts', '../src/utils.ts'],
    format: 'esm',
    outdir: '../dist',
    target: 'es2020',
  })
  .catch(() => process.exit(1));
