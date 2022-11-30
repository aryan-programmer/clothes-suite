import React from "react";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";

export type SignInProps_T = {};

export default function AuthenticationPage (props: SignInProps_T) {
	return (
		<div className="row g-4">
			<div className="col-md-6 col-12"><SignInForm /></div>
			<div className="col-md-6 col-12"><SignUpForm /></div>
		</div>
	);
}
