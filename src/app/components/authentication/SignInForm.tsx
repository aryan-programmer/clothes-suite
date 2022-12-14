import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {observer} from "mobx-react";
import React, {ChangeEvent, FormEvent, useCallback, useEffect, useState} from "react";
import {useResolve} from "../../../lib/injector/useResolve";
import UserStore from "../../store/user/user-store";
import {signInWithGoogleRedirect} from "../../utils/firebase";
import {useHandleAsyncError} from "../../utils/useHandleAsyncError";
import {useOpenSuccessDialog} from "../../utils/useOpenErrorDialog";
import Btn from "../common/Btn";
import {FormCard, FormCardFooterButtons, FormCardHeader, FormCardInputs} from "../common/FormCard";
import {InputBox} from "../common/InputBoxes";

export type SignInProps_T = {};

export default observer(function SignInForm (props: SignInProps_T) {
	const [email, setEmail]       = useState("");
	const [password, setPassword] = useState("");
	const openSuccessDialog       = useOpenSuccessDialog();
	const userStore               = useResolve(UserStore);
	const handleError             = useHandleAsyncError("Failed to sign in user");

	useEffect(() => void handleError(async () => {
		if (await userStore.checkRedirectResult()) {
			await openSuccessDialog("Signed in successfully");
		}
	}), [handleError, openSuccessDialog, userStore]);

	const onSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		handleError(async () => {
			if (await userStore.emailSignIn(email, password)) {
				await openSuccessDialog("Signed in successfully");
			} else throw new Error("Failed");
		});
	}, [email, handleError, openSuccessDialog, password, userStore]);

	const onInputBoxChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const {name, value} = event.target;
		if (name === "email") setEmail(value);
		else setPassword(value);
	}, []);

	return (
		<>
			<FormCard
				className="bg-gradient--tempting-azure mb-3 shadows-bg-light-primary"
				onSubmit={onSubmit}>
				<FormCardHeader>
					Already have an account? Sign in here.
				</FormCardHeader>
				<FormCardInputs>
					<InputBox
						type="email"
						required
						name="email"
						label="Email"
						onChange={onInputBoxChange}
					/>
					<InputBox
						type="password"
						required
						name="password"
						label="Password"
						onChange={onInputBoxChange}
					/>
				</FormCardInputs>
				<FormCardFooterButtons>
					<Btn
						extension="lg"
						borderColor="primary"
						type="submit">Sign In
					</Btn>
					<Btn extension="lg" borderColor="primary" onClick={signInWithGoogleRedirect}>
						<FontAwesomeIcon icon={["fab", "google"]} /> Sign in with Google
					</Btn>
				</FormCardFooterButtons>
			</FormCard>
		</>
	);
});
