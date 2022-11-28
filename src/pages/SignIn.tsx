import React from "react";
import {signInWithGooglePopup, createUserDocument} from "../utils/firebase/firebase";

export type SignInProps_T = {};

export default function SignIn (props: SignInProps_T) {
	const signIn = async()=>{
		const credential = await signInWithGooglePopup();
		const doc = await createUserDocument(credential.user);
		console.log(doc);
	};

	return (
		<div>
			<button className="btn" onClick={signIn}>Sign in with Google</button>
		</div>
	);
}
