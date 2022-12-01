# Clothes Suite

A clothes shopping web application developed with ReactJS (with Typescript) utilizing Firebase to store data.

## Setup

Before starting the application you must perform the following steps:

- Run `yarn install` to install all necessary dependencies.
- Create a Firebase project.
- Add a web application to this project.
- Paste the web app's Firebase configuration in src/app/utils/firebase/firebase.config.ts as:

```typescript
import {FirebaseOptions} from "@firebase/app";

export const firebaseConfig: FirebaseOptions = {
	apiKey: "API_KEY",
	authDomain: "AUTH_DOMAIN",
	projectId: "PROJECT_ID",
	storageBucket: "STORAGE_BUCKET",
	messagingSenderId: "MESSAGING_SENDER_ID",
	appId: "APP_ID",
};
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.\

### `yarn build`

Builds the app for production to the `build` folder.\
