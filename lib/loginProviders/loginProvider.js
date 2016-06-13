'use strict'

module.exports = class LoginProvider {
	constructor() {
	}

	authorize(req, res) {
		throw new Error("Abstract method!")
	}

	callbackHandler(req) {
		throw new Error("Abstract method!")
	}

	static redirectURI(req) {
		var pathComponents = req.path.split('/')
		pathComponents.pop()
		pathComponents.push('callback')

		return req.protocol + '://' + req.get('host') + req.baseUrl + pathComponents.join('/')
	}
}