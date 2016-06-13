'use strict'

let express = require('express')
let stormpath = require('stormpath')
let cookieParser = require('cookie-parser')

let stormpathClient = new stormpath.Client()

let router = express.Router()

router.providers = {}

// Middleware to populate req.provider, to be used below
router.use('/:accountID/:appID/:providerName', function(req, res, next) {
  let accountID = req.params.accountID
  let appID = req.params.appID
  let providerName = req.params.providerName
  let accountHref = 'https://api.stormpath.com/v1/accounts/' + accountID

  stormpathClient.getAccount(accountHref, { expand: 'customData' }, function(err, account) {
    let configExists = !err && account.customData.apps && account.customData.apps[appID] && account.customData.apps[appID][providerName]
    let providerExists = router.providers[providerName] != null

    if(configExists && providerExists) {
      // Need to figure out what type to create not based on ID, since OAuth2AuthorizationCode is generic
      let config = account.customData.apps[appID][providerName]
      req.provider = new router.providers[providerName](config)
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
  for(let key in providers) {
    router.providers[key] = providers[key]
  }
}

module.exports = router