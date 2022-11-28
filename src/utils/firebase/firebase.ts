import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider, signInWithPopup, User, UserCredential} from 'firebase/auth';
import {doc, DocumentReference, getDoc, getFirestore, setDoc} from 'firebase/firestore';
import nn from '../functions/nn';
import {UserData} from "../types";

const {firebaseConfig} = require("./firebase.config");
const app              = initializeApp(firebaseConfig);
const provider         = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account"
});

export const auth = getAuth(app);

export function signInWithGooglePopup (): Promise<UserCredential> {
	return signInWithPopup(auth, provider);
}

export const db = getFirestore(app);

export async function createUserDocument (user: User) {
	const userDoc  = doc(db, 'users', user.uid) as DocumentReference<UserData>;
	const userSnap = await getDoc(userDoc);
	if (!userSnap.exists()) {
		const {email, displayName, phoneNumber, photoURL} = user;
		const createdAt                                   = new Date();
		try {
			await setDoc(userDoc, {
				id: user.uid,
				email: nn(email),
				displayName,
				phoneNumber,
				photoURL,
				createdAt
			});
		} catch (error) {
			console.error("Failed to create user", error)
			throw error;
		}
	}
	return userDoc;
}
