const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: [
    './options.html',
    './src/options/**/*.{js,ts}',
    // './popup.html',
    // './src/popup/**/*.{js,ts}',
  ],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        extended: ['Monument Extended', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        black: {
          DEFAULT: '#0C0C0D',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
