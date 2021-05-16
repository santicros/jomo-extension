import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import esbuild from 'rollup-plugin-esbuild';
/**
 * @typedef { import("rollup").RollupOptions } RollupOptions
 */

const plugins = [resolve(), commonjs(), esbuild()];

/** @type {RollupOptions} */
const content = {
  input: './src/interventions/youtube/content.ts',
  output: {
    file: 'dist/interventions/youtube/content.js',
    format: 'iife',
  },
  plugins: [
    ...plugins,
    copy({
      targets: [
        {
          src: ['./src/interventions/youtube/content.css'],
          dest: 'dist/interventions/youtube',
        },
      ],
    }),
  ],
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

export default [content, utils];
