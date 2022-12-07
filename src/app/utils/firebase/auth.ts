import {
	CompleteFn,
	createUserWithEmailAndPassword,
	ErrorFn,
	getAuth,
	getRedirectResult as getRedirectResult_,
	GoogleAuthProvider,
	NextOrObserver,
	onAuthStateChanged as onAuthStateChanged_,
	signInWithEmailAndPassword as signInWithEmailAndPassword_,
	signInWithPopup,
	signInWithRedirect,
	signOut as signOut_,
	User,
	UserCredential
} from "@firebase/auth";
import {Unsubscribe} from "@firebase/util";
import {firebaseApp} from "./firebase-app";

export const auth = getAuth(firebaseApp);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account"
});

export function signInWithGooglePopup (): Promise<UserCredential> {
	return signInWithPopup(auth, provider);
}

export function signInWithGoogleRedirect (): Promise<UserCredential> {
	return signInWithRedirect(auth, provider);
}

export function getRedirectResult () {
	return getRedirectResult_(auth);
}

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
