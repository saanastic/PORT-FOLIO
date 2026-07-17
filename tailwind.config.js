/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {},
  },
  corePlugins: {
    preflight: false,
  },
  fontFamily: {
  display: ['Anton', 'sans-serif'],
  script: ['Caveat', 'cursive'],
}
};
