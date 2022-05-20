To get started with MST, clone a copy to your local machine using Git in your terminal.

Once the project has downloaded,  <span class="badge">cd</span>  into the directory and run <span class="badge">meteor npm install</span>. This will install all of MST's NPM dependencies for you. Make sure to do this before starting the server or you will get errors when you boot up.

Notice that here, we default to using <span class="badge">meteor npm install</span> as opposed to <span class="badge">npm install</span>. This is because <span class="badge">meteor npm install</span> uses the version of NPM bundled with Meteor instead of your own computer's global copy of NPM which ensures that any packages with binary dependencies (e.g., <span class="badge">bcrypt</span>) are built properly.

If you receive any errors in your terminal when you start up MST related to meteor npm install, make sure to follow the suggested commands to ensure dependencies are properly installed.

Once your dependencies are installed, just run meteor <span class="badge">npm run dev</span> to start the development server at <span class="badge">http://localhost:3000</span>.

~~~js
git clone https://github.com/deliteser112/meteor-starter-kit <my-project-name>
~~~

It's wise to pass a name (<my-project-name>) to rename MST specific to your project when you do.
~~~js
cd <my-project-name> && meteor npm install
~~~
Start the app locally
~~~js
meteor npm run dev
~~~
Make sure to run this from the root of your project in your terminal.
<blockquote>
  👉Don't have Meteor installed?

  Meteor is required in order for MST to run. To get it, [head over to this link](https://www.meteor.com/developers/install) and follow the instructions for your operating system.
</blockquote>

***

Have MST installed, running, and wondering what's next? We recommend learning about how MST organizes React components:

[<Button variant="contained">Learn About Organizing React Components</Button>](/documentation/organization)

***

<h6>Keeping Dependencies Up to Date</h6>

***

While MST's dependencies are updated as often as possible, it's a good practice to update your project's dependencies as frequently as makes sense. This ensures that your app isn't vulnerable to bugs or other issues introduced in MST's dependencies since the last release.

<h6>Atmosphere/Meteor Dependencies</h6>

While some Atmosphere (Meteor) dependencies still receive updates, many do not. Regardless, it's good to occasionally run meteor update to bring your packages up to their latest versions.

<h6>NPM Dependencies</h6>

To keep your NPM dependencies up to date, it's recommended that you utilize the <span class="badge">npm-check</span> [command line tool](https://www.npmjs.com/package/npm-check). This will tell you which dependencies in your project are out of date and guide you through the process of upgrading your dependencies.