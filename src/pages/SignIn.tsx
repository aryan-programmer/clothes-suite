import React, {useEffect} from "react";
import {createUserDocument, signInWithGoogleRedirect, getRedirectResult} from "../utils/firebase/firebase";
import {nonAsyncForwardingFn} from "../utils/functions/nonAsyncForwardingFn";

export type SignInProps_T = {};

export default function SignIn (props: SignInProps_T) {
	useEffect(nonAsyncForwardingFn(async () => {
		const credential = await getRedirectResult();
		if(credential==null)return;
		const doc        = await createUserDocument(credential.user);
		console.log(doc);
	}), []);

	return (
		<div>
			<button className="btn" onClick={signInWithGoogleRedirect}>Sign in with Google</button>
		</div>
	);
}
