'use strict'

var express = require('express')
var stormpathClient = require('stormpath')

var router = express.Router()

router.providers = {}

router.get('/:userID/:appID/:providerID/authorize', function(req, res) {
	res.send('authorizing!')
})

router.get('/:userID/:appID/:providerID/callback', function(req, res) {
	res.send('callback!')
})

router.addLoginProviders = function addLoginProviders(providers) {
	for(var key in providers) {
		router.providers[key] = providers[key]
	}
}

module.exports = router