'use strict'

module.exports = {
	web: require('./web'),
	api: require('./api'),
	addLoginProviders: function addLoginProviders(providers) {
		this.api.addLoginProviders(providers)
		this.web.addLoginProviders(providers)
	}
}

module.exports.addLoginProviders(require('./loginProviders'))