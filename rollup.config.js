import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import esbuild from 'rollup-plugin-esbuild';
/**
 * @typedef { import("rollup").RollupOptions } RollupOptions
 */

const plugins = [resolve(), commonjs(), esbuild()];

/**
 *
 * @param {*} name
 * @returns {RollupOptions}
 */
const contentScript = (name) => ({
  input: `./src/interventions/${name}/content.ts`,
  output: {
    file: `dist/interventions/${name}/content.js`,
    format: 'iife',
  },
  plugins: [
    ...plugins,
    copy({
      targets: [
        {
          src: [`./src/interventions/${name}/content.css`],
          dest: `dist/interventions/${name}`,
        },
      ],
    }),
  ],
});

const youtubeContent = contentScript('youtube');
const twitterContent = contentScript('twitter');
// const instagramContent = contentScript('instagram');

/** @type {RollupOptions} */
const twitterInPage = {
  input: './src/interventions/twitter/in_page.ts',
  output: {
    file: 'dist/interventions/twitter/in_page.js',
    format: 'iife',
  },
  plugins: [...plugins],
};

/** @type {RollupOptions} */
const utils = {
  input: './src/utils.ts',
  output: {
    file: 'dist/utils.js',
    format: 'esm',
  },
  plugins: [...plugins],
  treeshake: false,
};

export default [
  youtubeContent,
  twitterContent,
  twitterInPage,
  // instagramContent,
  utils,
];
