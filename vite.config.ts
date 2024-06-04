import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./__tests__/setup.js",
  },
  base: "https://fedelopez17.github.io/arpeggio-music-store/",
});
