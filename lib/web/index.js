'use strict'

var express = require('express')
var stormpath = require('express-stormpath')

var app = express()

var providers = []

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

module.exports = app