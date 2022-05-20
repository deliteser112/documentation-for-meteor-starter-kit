In order to store settings and configuration for the application (e.g., API keys for third-party services), MST relies on Meteor's settings.json convention. Stored at the root of the project, any file ending in .json and following a specific structure can be loaded on startup of the Meteor server as the settings file.

<blockquote>
  Update your product's name in the settings

  By default, MST ships with a set of placeholder values for your product name, the year your copyright should begin (i.e., the year you start work on your product), Twitter username, Facebook username, and mailing address (required for sending transactional and marketing emails). An example of this structure can be found below on this page.
</blockquote>

It's recommended that you generate separate settings files for each environment that your application will run in. Further, unless prohibited by the third-party, its wise to generate separate API keys or tokens for each environment.

In MST, by default the only settings file included is <span class="badge">settings-development.json</span>. In the project's <span class="badge">.gitignore</span> file (the file that Git uses to check which files it shouldn't commit to version control), two other presumed files are ignored: <span class="badge">settings-staging.json</span> (settings for your staging environment) and <span class="badge">settings-production.json</span> (settings for your production—or customer-facing—environment).

These latter files are in <span class="badge">.gitignore</span> because they contain potentially harmful data. Even if you're checking your code into a private repository, there's always the off-chance that an attacker could gain access to it, and subsequently, your keys. This is tolerable for your development keys, but not for staging or production as they could give unwanted access to user data.

The <span class="badge">settings-< environment>.json</span> naming convention is helpful for recognizing the settings that apply to each environment. You don't have to follow this, but it's best to do so as it's easy to get confused which file should be used where later.

***

<h6>Using settings in the app</h6>

Once loaded on startup, you can access the contents of your settings file via the Meteor.settings method.

~~~js
  import { Meteor } from 'meteor/meteor';

  // Returns the entire settings object:
  Meteor.settings
  // { public: { /* ... */ }, private: { /* ... */ } }

  // Returns only the public block.
  Meteor.settings.public

  // Returns only the private block.
  Meteor.settings.private

  // Example: retrieving the clientId value for GitHub
  Meteor.settings.private.OAuth.github.clientId
~~~

***

<h6>settings-< env>.json template</h6>

The settings template presented here is identical to the one found inside of MST. A few conventions to remain aware of:

* Any values stored in the <span class="badge">public</span> block will be made accessible to both the client and the server.
* Any values stored in the <span class="badge">private</span> block will be made accessible to the server only.
* Any values stored in the root object (at the same level as the <span class="badge">public</span> and <span class="badge">private</span> properties) will be made accessible to the server only (a safety precaution on Meteor's part).

Under the public block, MST includes a handful of configuration variables that globally set branding information for the app. These values are used throughout the UI of the app itself as well as in the email template located in <span class="badge">/private/email-templates/base.html</span>.

~~~js

  {
    "public": {
      "graphQL": {
        "httpUri": "http://localhost:3000/graphql",
        "wsUri": "ws://localhost:4001/graphql"
      },
      "productName": "Product Name",
      "copyrightStartYear": "2022",
      "twitterUsername": "product",
      "facebookUsername": "product",
      "productAddress": "13 Forester Way Pakenham VIC 3810, Australia"
    },
    "private": {
      "MAIL_URL": "",
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
          "loginStyle": "popup"
        }
      },
      "supportEmail": "Customer Support <support@product.com>"
    }
  }

~~~