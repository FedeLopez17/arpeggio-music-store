/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,tsx,jsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        catalog: "repeat(auto-fit, 320px)",
      },
    },
  },
  plugins: [],
};
