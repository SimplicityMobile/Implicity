# Implicity

WORK IN PROGRESS.

Implicity is the API backend for Simplicity, an iOS framework for easy mobile authentication via external providers.

With Implicity, any redirect-based login flow is turned into an "Implicit" style OAuth grant, hence the name "Implicity". This means that you can use any redirect-based login flow with your iOS app.

While Implicity is designed to work with Simplicity, you can also use it with Android and frontend web apps. 

## Why Use Implicity?

To get an access token for a user, some redirect-based login providers (for instance, LinkedIn) will not redirect a user back to a mobile app. To successfully get an access token, you need to complete the server-side OAuth flow, which Implicity performs for you. Some login providers require server-side secrets to make an API call to get an access token. Again, Implicity will handle that for you. 

Also, Implicity seamlessly works with Simplicity, meaning that you can use one library to do login for many different login providers. 

Logging in with Simplicity + Implicity is as easy as: 

```Swift
let apiURL = NSURL("https://yourserver.io/")!
let implicity = Implicity(url: apiURL, appId: "12345")

Simplicity.login(implicity.provider(.Google)) { (accessToken, error) in
  // Handle access token here
}
```

## Stormpath

Simplicity is maintained by [Stormpath](https://stormpath.com), an API service for authentication, authorization, and user management. If you're building a backend API for your app, consider using Stormpath to help you implement a secure REST API. Read our tutorial on how to [build a REST API for your mobile apps using Node.js](https://stormpath.com/blog/tutorial-build-rest-api-mobile-apps-using-node-js).

## Installation

Implicity is run as a hosted service, and you can use it at INSERT_URL_HERE. 

If you'd like to self-host Implicity, you need to set up Stormpath to act as the data store (we don't use a separate database):

1. [Register for a Stormpath Account](https://api.stormpath.com/register)
2. Set your environment variables, so Stormpath can connect to your database: 

```bash
STORMPATH_CLIENT_APIKEY_ID=
STORMPATH_CLIENT_APIKEY_SECRET=
STORMPATH_APPLICATION_HREF=
```

**Deploy it as a Standalone App**

```bash
git clone https://github.com/SimplicityMobile/Implicity
cd Implicity
npm start
```

Alternatively, you can use this Deploy to Heroku button to deploy Implicity.

INSERT BUTTON HERE

**Attach Implicity to your Node.js App**

If you're already using Express.js for your backend, you can attach Implicity to your application by doing the following:

```bash
npm install implicity --save
```

```js
var implicity = require("implicity")

app.use("/implicity/admin", implicity.web)
app.use("/implicity/api", implicity.api)
```

## Using Implicity

Once you've installed and run Implicity, go to the admin URL, and log in. You should be able to configure your app from there.

## Configuring your iOS App

See INSERT SIMPLICITY DOCS ON IMPLICITY

## How Implicity Works

## Building Your Own Login Provider

## Other External Login Providers

Want another external login provider implemented? Please [open a GitHub issue](https://github.com/SimplicityMobile/Implicity/issues) so I know it's in demand, or consider contributing to this project!

## Contributing

Please send a pull request with your new LoginProvider implemented. 

## License

Implicity is available under the Apache 2.0 license. See the LICENSE file for more info.