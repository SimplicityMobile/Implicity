'use strict'

module.exports = {
	web: require('./web'),
	api: require('./api'),
	providers: function(providers) {
		this.api.providers = providers
		this.web.providers = providers
	}
}