/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,tsx,jsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        catalog: "repeat(auto-fit, 320px)",
        "home-categories": "repeat(auto-fit, 320px)",
      },
      backgroundImage: {
        "radial-gradient-hero-slideshow":
          "radial-gradient(ellipse at center, rgba(0,0,0,0) 0%,rgba(0,0,0,1) 90%,rgba(0,0,0,1) 100%)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-in forwards",
      },
      dropShadow: {
        "category-instruments": "5px 5px 5px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
