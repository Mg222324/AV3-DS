const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    defaultCommandTimeout: 10000,
    video: false,
    supportFile: false,
    setupNodeEvents(on, config) {

    },
  },
});
