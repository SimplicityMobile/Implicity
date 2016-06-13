'use strict'

var LoginProvider = require('../loginProvider')
var request = require('request')

module.exports = class OAuth2AuthorizationCode extends LoginProvider {
	constructor(config, name, authorizationURI, tokenURI) {
		super()
		if(!(config.clientID && config.clientSecret)) { throw new Error('Invalid arguments') }
		this.config = {
			clientID: config.clientID,
			clientSecret: config.clientSecret,
			scopes: config.scopes || ''
		}
		this.authorizationURI = authorizationURI
		this.tokenURI = tokenURI
	}

	authorize(req, res) {
		var state = Math.floor(Math.random()*1000000000)

		var authorizationURI = this.authorizationURI + '?response_type=code&client_id=' 
			+ this.config.clientID + '&redirect_uri=' + LoginProvider.redirectURI(req) + '&state=' + state

		res.cookie('state', state)
		res.redirect(authorizationURI)
	}

	callbackHandler(req) {
		var self = this
		return new Promise(function(resolve, reject) {
			if (req.query.error != null || req.query.code == null || req.query.state != req.cookies.state) {
				return reject(new Error()) // TODO: figure out error handling
			}
			// Exchange for auth code
			var oauthTokenRequest = {
				url: self.tokenURI,
				form: { 
					grant_type: 'authorization_code',
					code: req.query.code,
					redirect_uri: LoginProvider.redirectURI(req),
					client_id: self.config.clientID,
					client_secret: self.config.clientSecret
				} 
			}

			request.post(oauthTokenRequest, function(err, httpResponse, body) {
				var parsedBody = JSON.parse(body)

				if (parsedBody.access_token) {
					return resolve(parsedBody.access_token)
				} else {
					return reject(new Error(parsedBody.error_description)) // TODO: figure out error handling
				}
			})
		})
	}
}