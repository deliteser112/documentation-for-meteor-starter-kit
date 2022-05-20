In order to help keep code formatting consistent, MST utilizes the ESLint library. This tool is designed to run via your IDE/text editor or the command line. "Linting" occurs by evaluating your project's source code against a set of rules that suggest how your code should be written.

While there's on "one true" set of rules, MST prefers to use the popular [AirBnB JavaScript Style Guide](https://github.com/airbnb/javascript). It's a well-maintained set of rules used by a major company which ensures that your own code will be well-aligned with a large subset of the development community.

MST also utilizes the Prettier code formatter. While not a linter, Prettier works in conjunction with ESLint by automatically formatting the syntax (how the actual code is written) to automatically map to an opinionated standard.

In addition to these two tools, MST also includes a handful of "plugins" for ESLint which add rules particular to some of the technology used in MST like Meteor, React, Jest, and TestCafe.

Linting is a broad topic. What's most important to understand is that it's designed to help you not hurt you. It's goal is to ensure that your code stays consistent throughout your project. As your project grows in size, this becomes more and more valuable.

When you're working with MST, it's highly recommended that you install the ESLint plugin for your IDE/text editor of choice. For example, this [VSCode package](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) in conjunction with [this VSCode package](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) are used during the development of MST.

If you'd like to customize any of the rules, MST stores this in the <span class="badge">package.json</span> file stored at the root of the project. The rules are located within the <span class="badge">eslintConfig</span> object in this file.
