'use strict'

var express = require('express')

var router = express.Router()

var providers = []

router.get('/:userID/:appID/:providerID/authorize', function(req, res) {
	res.send('authorizing!')
})

router.get('/:userID/:appID/:providerID/callback', function(req, res) {
	res.send('callback!')
})

module.exports = router