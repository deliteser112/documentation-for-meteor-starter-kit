To help with the process of customizing your user's experience, MST includes a User Settings convention that allows both you and individual users to manage their settings. Settings for users are stored in two places: the <span class="badge">UserSettings</span> collection, which acts as the "master" list for all settings in the app and on each individual user—in an array called settings—in the <span class="badge">Meteor.users</span> collection.

Settings for each user are stored as a single object in the user's settings array. Each setting stored on the user has a schema that's identical to the "master" setting in the <span class="badge">UserSettings</span> collection.

For administrators of the application (users with the role admin applied), user settings can be managed when viewing individual users via the <span class="badge">/dashboard/users</span> page.

For non-adminstrative users looking to manage their own settings, these can be accessed via the user's <span class="badge">/profile</span> page.

~~~js
    {
    "_id": "LtPBamXqg6iLQLcfP",
    [...]
    "settings": [
        {
        "_id": "xezY4GS7z4z57omRW",
        "key": "canSendMarketingEmails",
        "isGDPR": true,
        "label": "Can we send you marketing emails?",
        "type": "boolean",
        "value": false
        },
    ]
    }
~~~

***

<h6> Default User Settings </h6>

While new settings can be added via the admin GUI described below, when you first deploy your application, you may want to seed your <span class="badge">UserSettings</span> collection with a set of default settings.

By default, MST includes a file for helping with this located at <span class="badge">/startup/server/accounts/userSettings.js</span>. This file is only intended to add settings in bulk to a new deployment. It should NOT serve as an alternative way to add new settings to users (meaning, do not expect this file to add each of the default settings to your existing user base).

~~~js
    import UserSettings from '../../../api/UserSettings/UserSettings';

    const defaultUserSettings = [
    {
        isGDPR: true,
        key: 'canSendMarketingEmails',
        label: 'Can we send you marketing emails?',
        type: 'boolean',
        value: 'false', // Pass a string and allow schema to convert to a Boolean for us.
    },
    ];

    defaultUserSettings.forEach((setting) => {
    if (!UserSettings.findOne({ key: setting.key })) {
        UserSettings.insert(setting);
    }
    });
~~~

Automatically, when new users sign up for your app, they current state of the UserSettings collection will be copied over to that user's settings array. So, if you have five settings globally in <span class="badge">UserSettings</span>, those five settings will be applied to each new user that signs up. This behavior can be customized or removed in <span class="badge">/startup/server/accounts/onCreateUser.js</span>