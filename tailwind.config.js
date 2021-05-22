module.exports = {
  mode: 'jit',
  purge: [
    './options.html',
    './src/options/*.{js,ts}',
    './popup.html',
    './src/popup/*.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
