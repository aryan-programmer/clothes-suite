import {observer} from "mobx-react";
import React, {useEffect} from "react";
import {useNavigate} from "react-router";
import {useResolve} from "../../../lib/injector/useResolve";
import UserStore from "../../store/user/user-store";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export type SignInProps_T = {};

export default observer(function AuthenticationPage (props: SignInProps_T) {
	const userStore = useResolve(UserStore);
	const redirect  = useNavigate();
	useEffect(() => {
		if (userStore.user != null) {
			redirect("/");
		}
	}, [userStore.user]);
	return (
		<div className="row g-4">
			<div className="col-md-6 col-12"><SignInForm /></div>
			<div className="col-md-6 col-12"><SignUpForm /></div>
		</div>
	);
});
