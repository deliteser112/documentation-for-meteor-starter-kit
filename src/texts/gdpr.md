By default, MST includes a single setting—showcased in User Settings—that's automatically added to all new users for managing whether or not you should send them marketing emails. This value is intended to help you comply with the European Union's (EU) General Data Protection Regulation (GDPR).

To aid in the process of collecting each user's consent, after signing up, users are immediately presented with a "GDPR Consent" modal. This modal is only displayed if the user has not reviewed a setting that's flagged as <span class="badge">isGDPR: true</span> and has a <span class="badge">lastUpdatedByUser</span> value of null.

<img src="/assets/gdpr.jpg" style="object-fit: contain" />

When displayed, the modal presents users with only the settings flagged as <span class="badge">isGDPR</span> —all others are excluded. Upon pressing "Save Settings" in the modal, all GDPR-related settings have their <span class="badge">lastUpdatedByUser</span> field updated with a timestamp for the current date and time.

~~~js
  UserSettings.insert({
    userId: user._id,
    settings: [{
      isGDPR: true,
      key: 'canSendMarketingEmails',
      label: 'Can we send you marketing emails?',
      value: false,
      lastUpdatedByUser: null,
      lastUpdatedByAdmin: (new Date()).toISOString(),
    }],
  });
~~~

Though not in use in anywhere in the application (MST doesn't send any marketing emails on your behalf), you can access this value using the <span class="badge">getUserSettings()</span> module in your own app if you do decide to send marketing email to users.