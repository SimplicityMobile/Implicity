'use strict'

var express = require('express')
var stormpath = require('express-stormpath')

var app = express()

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
  for(var key in providers) {
    app.providers[key] = providers[key]
  }
}

module.exports = app