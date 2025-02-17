import { defineConfig } from "vite";
import litCss from "vite-plugin-lit-css";
import browserslist from 'browserslist';
import {browserslistToTargets} from 'lightningcss';

export default defineConfig({
  css: {
    transformer: "lightningcss",
    lightningcss: {
      targets: browserslistToTargets(browserslist(">= 0.25%")),
    },
  },
  build: {
    cssMinify: "lightningcss",
  },
  plugins: [
    litCss({
      // your global and rel="stylesheet" styles must be excluded
      exclude: "./src/index.css",
    }),
  ],
});
