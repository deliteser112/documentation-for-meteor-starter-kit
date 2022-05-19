In order to use OAuth logins with MST, you need to register your credentials for each of the supported services (Facebook, GitHub, or Google) that you wish to support. The good news: we've automated this as much as possible for you. In order to configure a supported service, you will need to update your <span class="badge">settings-development.json</span> (as well as <span class="badge">settings-staging.json</span> and <span class="badge">settings-production.json</span>) file in the root of your project.

For each service, you will need to provide:

* An OAuth <span class="badge">clientId</span> (appId for Facebook)
* An OAuth <span class="badge">secret</span>
* <span class="badge">loginStyle</span> for user credential retrieval (<span class="badge">popup</span> or <span class="badge">redirect</span>)

You can retrieve credentials for each service at the following links:

* [Get credentials for Facebook](https://developers.facebook.com/)
* [Get credentials for GitHub](https://github.com/settings/developers)
* [Get credentials for Google](https://console.developers.google.com/apis/credentials)

~~~js
  "OAuth": {
    "facebook": {
      "enabled": true,
      "appId": "<your key>",
      "secret": "<your key>",
      "loginStyle": "popup"
    },
    "google": {
      "enabled": true,
      "clientId": "<your key>",
      "secret": "<your key>",
      "loginStyle": "popup"
    },
    "github": {
      "enabled": true,
      "clientId": "<your key>",
      "secret": "<your key>",
      "loginStyle": "redirect"
    }
  },
~~~