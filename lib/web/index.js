'use strict'

const express = require('express')
const stormpath = require('express-stormpath')

const app = express()

app.providers = {}

app.use(stormpath.init(app, {
  expand: {
    customData: true
  }, 
  web: {
    produces: ['text/html']
  }
}))

app.get('/', function(req, res) {
  res.send('Implicity!!')
})

app.addLoginProviders = function addLoginProviders(providers) {
  for(const key in providers) {
    app.providers[key] = providers[key]
  }
}

module.exports = app