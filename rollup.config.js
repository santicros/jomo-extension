import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';

const plugins = [resolve(), commonjs(), esbuild()];

const content = {
  input: './src/interventions/youtube/content.ts',
  output: {
    file: 'dist/interventions/youtube/content.js',
    format: 'iife',
  },
  plugins: [...plugins],
};

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
