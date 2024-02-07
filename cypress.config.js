require('dotenv').config()
const { configureAllureAdapterPlugins } = require('@mmisty/cypress-allure-adapter/plugins')

const { defineConfig } = require('cypress')
const { configurePlugin } = require('cypress-mongodb')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      configureAllureAdapterPlugins(on, config)
      configurePlugin(on)

      return config
    },
    specPattern: ['./cypress/support/hooks/index.cy.js', './cypress/e2e/*'],
    baseUrl: process.env.BASE_URL,
    watchForFileChanges: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    scrollBehavior: false,
    video: false
  },
  env: {
    allure: true,
    allureAttachRequests: true,
    mongodb: {
      uri: process.env.MONGO_URI,
      database: process.env.DB_NAME
    }
  }
})
