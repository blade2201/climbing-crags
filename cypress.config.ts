import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
  },

  env: {
    googleId: process.env.GOOGLE_ID,
    googleSecret: process.env.GOOGLE_SECRET,
    googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
