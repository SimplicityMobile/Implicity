var express = require('express')
var request = require('request')
var stormpath = require('express-stormpath')

var app = express()

var hello = function(req, res){
	res.send("hello world");
}

app.use(stormpath.init(app, {
	expand: {
		customData: true
	}
}));

app.get('/', hello)


app.get("/implicitycallbacks/twitter", stormpath.loginRequired, function(req, res){
	var code = req.query.oauth_verifier

	var request_form = {
		  oauth_consumer_key:"L3j0Ks9nHrXKHRH2CbEz2tv3o",
		  oauth_signature_method:"HMAC-SHA1",
		  oauth_version:"1.0"
		  oauth_verifier:oauth_verifier
	}

	var r = request.post({url:'https://api.twitter.com/oauth/access_token', form:requestForm}, function(err, httpResponse, body){
		var access_token = JSON.parse(body)
		res.send("Access Token is " + json.access_token)
		
	})
})

app.get('/twitter', stormpath.loginRequired, function(req, res){

	var request_form = {
		  oauth_callback:"https://localhost:3000/implicitycallbacks/twitter",
		  oauth_consumer_key:"L3j0Ks9nHrXKHRH2CbEz2tv3o",
		  oauth_signature_method:"HMAC-SHA1",
		  oauth_version:"1.0"
	}
	
	var request_t = request.post(url:'https://api.twitter.com/oauth/request_token', form:form, function(err, httpResponse, body))
	var request_token = JSON.parse(body)

	var twitter_url = 'https://api.twitter.com/oauth/authenticate?' 
	twitter_url += 'oauth_token' + json.oauth_token

	res.redirect(twitter_url)
	console.log(twitter_url)
	
})



app.listen(3000)


