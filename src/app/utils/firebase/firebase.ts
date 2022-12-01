import {NextOrObserver} from "@firebase/auth";
import {Unsubscribe} from "@firebase/util";
import {initializeApp} from 'firebase/app';
import {
	CompleteFn,
	createUserWithEmailAndPassword,
	ErrorFn,
	getAuth,
	getRedirectResult as getRedirectResult_,
	GoogleAuthProvider,
	onAuthStateChanged as onAuthStateChanged_,
	signInWithEmailAndPassword as signInWithEmailAndPassword_,
	signInWithPopup,
	signInWithRedirect,
	signOut as signOut_,
	User,
	UserCredential
} from 'firebase/auth';
import {doc, DocumentReference, getDoc, getFirestore, setDoc} from 'firebase/firestore';
import nn from '../../../lib/functions/nn';
import {UserData} from "../types";

export {FirebaseError} from 'firebase/app';
export * from "./firebaseAuthErrorCodes";


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

export function signInWithGoogleRedirect (): Promise<UserCredential> {
	return signInWithRedirect(auth, provider);
}

export function getRedirectResult () {
	return getRedirectResult_(auth);
}

export const db = getFirestore(app);

export async function signUpWithEmailAndPassword (email: string, password: string) {
	if (email.length === 0) return;
	if (password.length === 0) return;
	return await createUserWithEmailAndPassword(auth, email, password);
}

export async function signInWithEmailAndPassword (email: string, password: string) {
	if (email.length === 0) return;
	if (password.length === 0) return;
	return await signInWithEmailAndPassword_(auth, email, password);
}

export function signOut () {
	return signOut_(auth);
}

export function onAuthStateChanged (nextOrObserver: NextOrObserver<User>, error?: ErrorFn, completed?: CompleteFn): Unsubscribe {
	return onAuthStateChanged_(auth, nextOrObserver, error, completed);
}

export async function createUserDocumentOrOverrideData (user: User, overridingData?: Partial<UserData>) {
	const userDoc  = doc(db, 'users', user.uid) as DocumentReference<UserData>;
	const userSnap = await getDoc(userDoc);
	if (!userSnap.exists() || overridingData != null) {
		const {email, displayName, phoneNumber, photoURL} = user;
		const createdAt                                   = new Date();
		try {
			await setDoc(userDoc, {
				id: user.uid,
				email: nn(email),
				displayName,
				phoneNumber,
				photoURL,
				createdAt,
				...overridingData,
			});
		} catch (error) {
			console.error("Failed to create user", error)
			throw error;
		}
	}
	return userDoc;
}
