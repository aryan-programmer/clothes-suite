# Clothes Suite

A clothes shopping web application developed with ReactJS (with Typescript). View the website hosted on Netlify: [https://clothes-suite-80b2ff.netlify.app/](https://clothes-suite-80b2ff.netlify.app/)

Key Features:
- Utilizes Firebase to store data on the server side.
- Implements global state-management with MobX. Uses TSyringe to ensure proper dependency injection of singleton stores.
- Implements a demonstration payment API with Stripe.
- Uses a customized version of Bootstrap 5 to implement a [neumorphism](https://www.toptal.com/designers/ui/neumorphic-ui-design) like interface.

## Setup

Before starting the application you must perform the following steps:

- Run `yarn install` to install all necessary dependencies.
- Create a Firebase project.
- Add a web application to this project.
- Paste the web app's Firebase configuration in `netlify.toml` as a JSON object representation:
- Paste the web app's Stripe Publishable Key in `netlify.toml` as well:
- Paste the Stripe Secret key in `netlify.toml`:

```toml
[context.environment]
  REACT_APP_FIREBASE_CONFIG='{ "apiKey": "API_KEY", "authDomain": "AUTH_DOMAIN", "projectId": "PROJECT_ID", "storageBucket": "STORAGE_BUCKET", "messagingSenderId": "MESSAGING_SENDER_ID", "appId": "APP_ID" }'
  REACT_APP_STRIPE_PUBLIC_KEY='public_kvalue'
  STRIPE_PRIVATE_API_KEY='private_kvalue'
```

## Available Commands

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `netlify dev`

This runs the serverless function(s) so that one can test the payment API. The local server is generally hosted on [http://localhost:8888](http://localhost:8888) 

### `yarn test`

Launches the test runner in the interactive watch mode.\

### `yarn build`

Builds the app for production to the `build` folder.\
