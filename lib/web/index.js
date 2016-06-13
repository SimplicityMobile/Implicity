'use strict'

let express = require('express')
let stormpath = require('express-stormpath')

let app = express()

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
  for(let key in providers) {
    app.providers[key] = providers[key]
  }
}

module.exports = app