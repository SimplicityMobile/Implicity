'use strict'

var express = require('express')
var stormpath = require('stormpath')
var cookieParser = require('cookie-parser')

var stormpathClient = new stormpath.Client()

var router = express.Router()

router.providers = {}

router.use('/:accountID/:appID/:providerID', function(req, res, next) {
  var accountID = req.params.accountID
  var appID = req.params.appID
  var providerID = req.params.providerID
  var accountHref = 'https://api.stormpath.com/v1/accounts/' + accountID

  stormpathClient.getAccount(accountHref, { expand: 'customData' }, function(err, account) {
    var configExists = !err && account.customData.apps && account.customData.apps[appID] && account.customData.apps[appID][providerID]
    var providerExists = router.providers[providerID] != null

    if(configExists && providerExists) {
      // Need to figure out what type to create not based on ID, since OAuth2AuthorizationCode is generic
      req.provider = new router.providers[req.params.providerID](account.customData.apps[appID][providerID])
      next()
    } else {
      return res.status(404).send('404')
    }
  })
})

router.get('/:accountID/:appID/:providerID/authorize', function(req, res) {
  req.provider.authorize(req, res)
})

router.get('/:accountID/:appID/:providerID/callback', cookieParser(), function(req, res) {
  req.provider.callbackHandler(req).then(function(accessToken) {
    res.send('Your access token is ' + accessToken)
  }).catch(function(err) {
    res.status(500).send('TODO: Error handling unimplemented')
  })
})

router.addLoginProviders = function addLoginProviders(providers) {
  for(var key in providers) {
    router.providers[key] = providers[key]
  }
}

module.exports = router