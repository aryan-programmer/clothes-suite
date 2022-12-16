import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {ChangeEvent, FormEvent, useCallback, useEffect, useState} from "react";
import {useAppDispatch} from "../../store/store";
import {userSlice} from "../../store/user/user-slice";
import {signInWithGoogleRedirect} from "../../utils/firebase";
import Btn from "../common/Btn";
import {FormCard, FormCardFooterButtons, FormCardHeader, FormCardInputs} from "../common/FormCard";
import {InputBox} from "../common/InputBoxes";

export type SignInProps_T = {};

export default function SignInForm (props: SignInProps_T) {
	const [email, setEmail]       = useState("");
	const [password, setPassword] = useState("");
	const dispatch                = useAppDispatch();

	useEffect(() => void dispatch(userSlice.actions.checkRedirectResult()), []);

	const onSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(userSlice.actions.emailSignInStart({email, password}));
	}, [dispatch, email, password]);

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
}
