import {User, UserCredential} from "@firebase/auth";
import {PayloadAction} from "@reduxjs/toolkit";
import {SagaIterator} from "redux-saga";
import * as effects from "redux-saga/effects";
import {Alert} from "../../../lib/dialogs/basic-dialogs/Alert";
import nn from "../../../lib/functions/nn";
import {Optional} from "../../../lib/types";
import {
	createUserDocumentOrOverrideData,
	FirebaseAuthErrorCodes,
	FirebaseError,
	getRedirectResult,
	restoreUserSession,
	signInWithEmailAndPassword,
	signOut,
	signUp
} from "../../utils/firebase";
import {openDialogAction} from "../dialogs/dialogs";
import {SignUpPayload_T, userSlice} from "./user-slice";

function getMessageFromError (e: any, defaultMessage: string = "Unknown error") {
	console.error(e);
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

function* onEmailSignInStart (action: PayloadAction<{ email: string, password: string }>): SagaIterator {
	try {
		const {email, password} = action.payload;
		const user: User        = nn(yield effects.call(signInWithEmailAndPassword, email, password));
		yield effects.put(userSlice.actions.signInSuccess(user));
	} catch (e) {
		yield effects.put(userSlice.actions.signInFailed(e));
	}
}

function* onCheckRedirectResult (): SagaIterator {
	try {
		const credential: UserCredential = yield effects.call(getRedirectResult);
		if (credential == null) {
			return;
		}
		yield effects.call(createUserDocumentOrOverrideData, credential.user);
		yield effects.put(userSlice.actions.signInSuccess(credential.user));
	} catch (e) {
		yield effects.put(userSlice.actions.signInFailed(e));
	}
}

function* onRestoreUserSession (): SagaIterator {
	const user: Optional<User> = yield effects.call(restoreUserSession);
	if (user == null) {
		return;
	}
	yield effects.put(userSlice.actions.restoredUserSession(user));
}

function* onSignInSuccess (action: PayloadAction<User>): SagaIterator {
	yield effects.put(openDialogAction(Alert, {
		body: "Signed in successfully",
		backgroundColor: "light-success",
	}));
}

function* onSignInFailure (action: PayloadAction<any>): SagaIterator {
	yield effects.put(openDialogAction(Alert, {
		body: getMessageFromError(action.payload, "Failed to sign in user"),
		backgroundColor: "light-danger",
	}));
}


function* onSignUpStart (action: PayloadAction<SignUpPayload_T>): SagaIterator {
	try {
		const {email, password, name} = action.payload;
		const user: User              = nn(yield effects.call(signUp, email, password, name));
		yield effects.call(createUserDocumentOrOverrideData, user, {displayName: name});
		yield effects.put(userSlice.actions.signUpSuccess(user));
	} catch (e) {
		yield effects.put(userSlice.actions.signUpFailed(e));
	}
}

function* onSignUpSuccess (action: PayloadAction<User>): SagaIterator {
	yield effects.put(openDialogAction(Alert, {
		body: "Signed up successfully",
		backgroundColor: "light-success",
	}));
}

function* onSignUpFailure (action: PayloadAction<any>): SagaIterator {
	yield effects.put(openDialogAction(Alert, {
		body: getMessageFromError(action.payload, "Failed to sign up user"),
		backgroundColor: "light-danger",
	}));
}

function* onSignOut (): SagaIterator {
	yield effects.call(signOut);
	yield effects.put(openDialogAction(Alert, {
		body: "Signed out successfully"
	}));
}

export function* userSaga (): SagaIterator {
	yield effects.all([
		effects.takeLatest(userSlice.actions.emailSignInStart, onEmailSignInStart),
		effects.takeLatest(userSlice.actions.signInSuccess, onSignInSuccess),
		effects.takeLatest(userSlice.actions.signInFailed, onSignInFailure),
		effects.takeLatest(userSlice.actions.signInFailed, onRestoreUserSession),
		effects.takeLatest(userSlice.actions.checkRedirectResult, onCheckRedirectResult),
		effects.takeLatest(userSlice.actions.restoreUserSession, onRestoreUserSession),
		effects.takeLatest(userSlice.actions.signUpStart, onSignUpStart),
		effects.takeLatest(userSlice.actions.signUpSuccess, onSignUpSuccess),
		effects.takeLatest(userSlice.actions.signUpFailed, onSignUpFailure),
		effects.takeLatest(userSlice.actions.signOut, onSignOut),
	]);
}
