import {initializeApp} from "@firebase/app";
import nn from "../../../lib/functions/nn";

const firebaseConfig     = JSON.parse(nn(process.env.REACT_APP_FIREBASE_CONFIG));
export const firebaseApp = initializeApp(firebaseConfig);
