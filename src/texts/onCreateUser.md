On occasion, your product may need to add some extra information to a user before they're inserted into the <span class="badge">Meteor.users</span> collection. To help with this, Meteor includes the <span class="badge">Accounts.onCreateUser()</span> hook which allows us to modify the new user document just before it's inserted into <span class="badge">Meteor.users</span>.

<blockquote>
  New OAuth user welcome emails
  
  In MST, we use the <span class="badge">Accounts.onCreateUser()</span> hook to send new users who sign up via an OAuth provider a welcome email. This is done via the <span class="badge">sendWelcomeEmail()</span> module imported from <span class="badge">/api/Users/actions/sendWelcomeEmail.js</span>.
</blockquote>

This means that, for example, if we wanted to add an extra field to our user like onboarding, we can do this in the <span class="badge">Accounts.onCreateUser</span> hook. In MST, we've defined an example of using the <span class="badge">Accounts.onCreateUser</span> hook in <span class="badge">/startup/server/accounts/onCreateUser.js</span>.

By default, Meteor runs this hook behind the scenes, assigning a profile field to the user if one is passed to the <span class="badge">Accounts.createUser</span>() method. In MST, our example does the exact same thing that Meteor does, however, exposes the <span class="badge">Accounts.onCreateUser</span> hook so it's easily available for your modification.

This file is imported into the <span class="badge">/startup/server/accounts/index.js</span> file by default, but you can remove it if you wish.