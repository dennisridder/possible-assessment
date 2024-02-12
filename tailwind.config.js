/** @type {import('tailwindcss').Config} */
export default {
  purge: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#6E2594",
        secondary: "#CC2936",
        tertiary: "#BBA0B2",
      },
    },
  },
  plugins: [],
};
