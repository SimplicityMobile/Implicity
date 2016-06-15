
var express = require('express');
var util = require('util');
var oauth = require('oauth');

var app = express.createServer();

// Get your credentials here: https://dev.twitter.com/apps
var _twitterConsumerKey = "twitterConsumerKey";
var _twitterConsumerSecret = "twitterConsumerSecret";

var consumer = new oauth.OAuth(
    "https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token", 
    _twitterConsumerKey, _twitterConsumerSecret, "1.0A", "http://127.0.0.1:8080/sessions/callback", "HMAC-SHA1");

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    app.use(express.logger());
    app.use(express.cookieParser());
    app.use(express.session({ secret: "very secret" }));
});

app.dynamicHelpers({
    session: function(req, res){
        return req.session;
    }
});

app.get('/sessions/connect', function(req, res){
  consumer.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results){
    if (error) {
      res.send("Error getting OAuth request token : " + util.inspect(error), 500);
    } else {  
      req.session.oauthRequestToken = oauthToken;
      req.session.oauthRequestTokenSecret = oauthTokenSecret;
      res.redirect("https://twitter.com/oauth/authorize?oauth_token="+req.session.oauthRequestToken);      
    }
  });
});

app.get('/sessions/callback', function(req, res){
  util.puts(">>"+req.session.oauthRequestToken);
  util.puts(">>"+req.session.oauthRequestTokenSecret);
  util.puts(">>"+req.query.oauth_verifier);
  consumer.getOAuthAccessToken(req.session.oauthRequestToken, req.session.oauthRequestTokenSecret, req.query.oauth_verifier, function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
    if (error) {
      res.send("Error getting OAuth access token : " + util.inspect(error) + "["+oauthAccessToken+"]"+ "["+oauthAccessTokenSecret+"]"+ "["+util.inspect(results)+"]", 500);
    } else {
      req.session.oauthAccessToken = oauthAccessToken;
      req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
      
      res.redirect('/home');
    }
  });
});

app.get('/home', function(req, res){
    consumer.get("http://twitter.com/account/verify_credentials.json", req.session.oauthAccessToken, req.session.oauthAccessTokenSecret, function (error, data, response) {
      if (error) {
          res.redirect('/sessions/connect');
          // res.send("Error getting twitter screen name : " + util.inspect(error), 500);
      } else {
          var parsedData = JSON.parse(data);

        // req.session.twitterScreenName = response.screen_name;    
        res.send('You are signed in: ' + parsedData.screen_name);
      } 
    });
});

app.get('*', function(req, res){
    res.redirect('/home');
});

app.listen(8080);