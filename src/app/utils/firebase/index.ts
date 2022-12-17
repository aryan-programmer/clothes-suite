import {FirebaseError} from "firebase/app";
import {FirebaseAuthErrorCodes} from "./FirebaseAuthErrorCodes";

export {FirebaseError} from 'firebase/app';
export * from "./FirebaseAuthErrorCodes";

export * from "./firebase-app";
export * from "./auth";
export * from "./firestore-db";

export function getMessageFromError (e: any, defaultMessage: string = "Unknown error") {
	let message = defaultMessage;
	if (e instanceof FirebaseError) {
		if (e.code === FirebaseAuthErrorCodes.INVALID_PASSWORD)
			message = "Invalid email or password";
		else if (e.code === FirebaseAuthErrorCodes.USER_NOT_FOUND)
			message = "No user with that email was found";
		else if (e.code === FirebaseAuthErrorCodes.EMAIL_EXISTS)
			message = "Email already used to sign up a user";
	}
	return message;
}
