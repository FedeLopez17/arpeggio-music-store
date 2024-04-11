/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,tsx,jsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        catalog: "repeat(auto-fit, 320px)",
        "home-categories": "repeat(auto-fit, 300px)",
      },
      backgroundImage: {
        "radial-gradient-hero-slideshow":
          "radial-gradient(ellipse at center, rgba(0,0,0,0) 0%,rgba(0,0,0,1) 90%,rgba(0,0,0,1) 100%)",
        "banner-shape-left":
          "url('./src/assets/images/banners/bg-shape-left.svg'), linear-gradient(45deg, rgb(162 102 222) , transparent)",
        "banner-shape-right":
          "url('./src/assets/images/banners/bg-shape-right.svg'), linear-gradient(45deg, transparent, rgb(141 145 149))",
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
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
