'use strict'

module.exports = class Provider {
	constructor(config) {
		this.config = config
	}

	static get config() {
		return {}
	}

	get authorizationURL() {
		throw new Error("Abstract method!")
	}

	callbackHandler(req, callback) {
		throw new Error("Abstract method!")
	}
}