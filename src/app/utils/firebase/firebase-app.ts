import {initializeApp} from "@firebase/app";

const {firebaseConfig}   = require("./firebase.config");
export const firebaseApp = initializeApp(firebaseConfig);
