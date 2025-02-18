import { defineConfig } from 'cypress';

export default defineConfig({
  includeShadowDom: true,
  chromeWebSecurity: false,
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  video: false,
  e2e: {
    setupNodeEvents(on, config) {
      return config;
      // implement node event listeners here
    },
    env: {
      allureReuseAfterSpec: true,
    },
  },
});
