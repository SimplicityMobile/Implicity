'use strict'

let OAuth2AuthorizationCode = require('./oauth2AuthorizationCode')

module.exports = class LinkedIn extends OAuth2AuthorizationCode {
  constructor(config) {
    super(config, 'linkedin', 'https://www.linkedin.com/oauth/v2/authorization', 'https://www.linkedin.com/uas/oauth2/accessToken')
  }
}