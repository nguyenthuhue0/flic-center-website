/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // bật dark mode theo class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // quét code React
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
