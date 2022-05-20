The <span class="badge">package.json</span> file in your application contains various metadata (project name, version, etc.), configuration data, and utility information for your product.

Of note, the <span class="badge">package.json</span> file contains a meteor block with a nested mainModule object specifying where the main files for the app are stored. The "main files" are the files that are used to import all other files in the application: one for the client and one for the server.

Most importantly, the <span class="badge">package.json</span> file details the dependencies and devDependencies for your product. In other words, which NPM packages the product depends on. When collaborating with other developers, this list will be referenced by NPM when they run <span class="badge">meteor npm install</span> for the first time to download the product's dependencies.

The <span class="badge">package.json</span> file also contains configuration data for various tools utilized by MST like <span class="badge">ESLint</span>, <span class="badge">Husky</span>, and <span class="badge">Prettier</span>.

As an aid to developers working on the product, the <span class="badge">package.json</span> file also contains a set of scripts which can be used as short-hand commands in your terminal for performing certain tasks (e.g., starting your development server and loading your <span class="badge">settings-development.json</span> file simultaneously).

~~~js
  {
    "name": "meteor-react-starter-kit",
    "private": true,
    "scripts": {
      "dev": "meteor --settings settings-development.json",
      "staging": "meteor deploy --settings settings-staging.json",
      "production": "meteor deploy --settings settings-production.json",
      "lint": "eslint .",
      "lint:all": "eslint --fix .",
      "lint:file": "eslint --fix",
      "test": "jest",
      "test-watch": "jest --watch --verbose false",
      "test-e2e": "testcafe chrome:headless ui/**/*.e2e.js"
    },
    "dependencies": {
      "@apollo/react-hooks": "^4.0.0",
      "@babel/preset-env": "^7.17.10",
      "@babel/preset-react": "^7.16.7",
      "@babel/runtime": "^7.10.5",
      "@emotion/cache": "^11.4.0",
      "@emotion/react": "^11.4.0",
      "@emotion/styled": "^11.3.0",
      "@faker-js/faker": "^6.1.2",
      "@hookform/resolvers": "^2.8.8",
      "@iconify/icons-ic": "^1.2.3",
      "@iconify/react": "^3.2.1",
      "@mui/icons-material": "^5.0.3",
      "@mui/lab": "^5.0.0-alpha.50",
      "@mui/material": "^5.0.3",
      "@mui/styles": "^5.0.1",
      "@mui/system": "^5.0.3",
      "@mui/utils": "^5.0.1",
      "@mui/x-data-grid": "^5.0.0-beta.3",
      "@tabler/icons": "^1.39.1",
      "@testing-library/jest-dom": "^5.11.10",
      "@testing-library/react": "^11.2.6",
      "@testing-library/user-event": "^12.8.3",
      "apexcharts": "^3.26.1",
      "apollo-cache-inmemory": "^1.6.6",
      "apollo-client": "^2.6.10",
      "apollo-link-ddp": "^3.0.0",
      "apollo-link-error": "^1.1.13",
      "apollo-link-http": "^1.5.17",
      "apollo-server-express": "^3.6.7",
      "babel-core": "^6.26.3",
      "babel-eslint": "^10.1.0",
      "babel-jest": "^28.1.0",
      "bcrypt": "^5.0.0",
      "body-parser": "^1.20.0",
      "bootstrap": "^5.1.3",
      "change-case": "^4.1.2",
      "clsx": "^1.1.1",
      "commonmark": "^0.30.0",
      "date-fns": "^2.28.0",
      "eslint-config-airbnb": "^19.0.4",
      "eslint-import-resolver-meteor": "^0.4.0",
      "eslint-plugin-babel": "^5.3.1",
      "eslint-plugin-meteor": "^7.3.0",
      "eslint-plugin-testcafe": "^0.2.1",
      "express": "^4.17.3",
      "formik": "^2.2.6",
      "framer-motion": "^4.1.13",
      "graphql": "^15.5.0",
      "graphql-load": "^0.1.1",
      "graphql-tag": "^2.11.0",
      "graphql-tools": "^7.0.4",
      "handlebars": "^4.7.7",
      "highlight.js": "^11.5.1",
      "history": "^5.0.0",
      "jquery": "^3.6.0",
      "jszip": "^3.9.1",
      "juice": "^8.0.0",
      "lodash": "^4.17.21",
      "mapbox-gl": "^2.8.2",
      "material-ui-popup-state": "^1.8.0",
      "meteor-node-stubs": "^1.0.1",
      "moment": "^2.29.3",
      "moment-timezone": "^0.5.34",
      "notistack": "^2.0.4",
      "nprogress": "^0.2.0",
      "numeral": "^2.0.6",
      "prop-types": "^15.7.2",
      "react": "17.0.2",
      "react-apexcharts": "^1.3.7",
      "react-bootstrap": "^2.2.3",
      "react-device-detect": "^1.17.0",
      "react-dom": "17.0.2",
      "react-dropzone": "^12.0.5",
      "react-helmet-async": "^1.3.0",
      "react-hook-form": "^7.30.0",
      "react-lazy-load-image-component": "^1.5.4",
      "react-loading": "^2.0.3",
      "react-map-gl": "^7.0.11",
      "react-perfect-scrollbar": "^1.5.8",
      "react-quill": "^2.0.0-beta.4",
      "react-redux": "^7.2.3",
      "react-router": "6.0.0-beta.0",
      "react-router-dom": "6.0.0-beta.0",
      "react-scripts": "^4.0.3",
      "redux": "^4.0.5",
      "sanitize-html": "^2.7.0",
      "simplebar": "^5.3.6",
      "simplebar-react": "^2.3.6",
      "url-pattern": "^1.0.3",
      "web-vitals": "^2.1.4",
      "xml": "^1.0.1",
      "yup": "^0.32.9"
    },
    "meteor": {
      "mainModule": {
        "client": "startup/client/main.js",
        "server": "startup/server/index.js"
      },
      "testModule": "tests/main.js"
    },
    "devDependencies": {
      "@babel/core": "^7.14.8",
      "@babel/eslint-parser": "^7.15.8",
      "chai": "^4.2.0",
      "eslint": "^7.32.0",
      "eslint-config-airbnb-typescript": "^12.3.1",
      "eslint-config-prettier": "^8.3.0",
      "eslint-config-react-app": "6.0.0",
      "eslint-import-resolver-typescript": "2.4.0",
      "eslint-plugin-flowtype": "^5.7.2",
      "eslint-plugin-import": "^2.23.3",
      "eslint-plugin-jsx-a11y": "^6.5.1",
      "eslint-plugin-prettier": "^3.4.0",
      "eslint-plugin-react": "^7.26.1",
      "eslint-plugin-react-hooks": "^4.5.0",
      "prettier": "^2.2.1",
      "sass": "^1.50.0"
    },
    "eslintConfig": {
      "parser": "babel-eslint",
      "parserOptions": {
        "ecmaFeatures": {
          "jsx": true
        }
      },
      "plugins": [
        "babel",
        "jest",
        "meteor",
        "prettier",
        "react",
        "testcafe"
      ],
      "extends": [
        "airbnb",
        "plugin:prettier/recommended",
        "plugin:meteor/recommended",
        "plugin:react/recommended",
        "plugin:testcafe/recommended",
        "plugin:jest/recommended"
      ],
      "env": {
        "browser": true
      },
      "globals": {
        "expect": false
      },
      "rules": {
        "arrow-parens": [
          2,
          "always"
        ],
        "import/no-unresolved": 0,
        "import/no-extraneous-dependencies": 0,
        "import/extensions": 0,
        "indent": 0,
        "jsx-a11y/anchor-is-valid": [
          "error",
          {
            "components": [
              "Link"
            ],
            "specialLink": [
              "to"
            ]
          }
        ],
        "max-len": 0,
        "no-alert": 0,
        "no-console": 0,
        "no-restricted-globals": 0,
        "no-return-assign": [
          "error",
          "except-parens"
        ],
        "no-underscore-dangle": [
          "error",
          {
            "allow": [
              "_id",
              "_ensureIndex",
              "_verifyEmailToken",
              "_resetPasswordToken",
              "_name"
            ]
          }
        ],
        "class-methods-use-this": 0,
        "prettier/prettier": 2,
        "react/jsx-filename-extension": 0,
        "react/forbid-prop-types": 0
      },
      "settings": {
        "import/resolver": "meteor"
      }
    },
    "prettier": {
      "printWidth": 100,
      "tabWidth": 2,
      "useTabs": false,
      "semi": true,
      "singleQuote": true,
      "trailingComma": "all",
      "bracketSpacing": true,
      "jsxBracketSameLine": false,
      "arrowParens": "always",
      "rangeStart": 0,
      "parser": "babel",
      "proseWrap": "preserve"
    }
  }

~~~