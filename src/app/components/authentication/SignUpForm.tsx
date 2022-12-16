import React, {FormEvent, useCallback} from "react";
import {Alert} from "../../../lib/dialogs/basic-dialogs/Alert";
import {useOpenDialog} from "../../../lib/dialogs/DialogContext";
import {useBindString} from "../../../lib/functions/useBind";
import {useAppDispatch} from "../../store/store";
import {userSlice} from "../../store/user/user-slice";
import Btn from "../common/Btn";
import {FormCard, FormCardFooterButtons, FormCardHeader, FormCardInputs} from "../common/FormCard";
import {InputBoxControlled} from "../common/InputBoxes";

export type SignUpProps_T = {};
export type SignUpState_T = {
	name: string,
	email: string,
	password: string,
	rePassword: string,
};

export function SignUpForm (props: SignUpProps_T) {
	const openDialog                                  = useOpenDialog();
	const [name, setName, bindName]                   = useBindString("");
	const [email, setEmail, bindEmail]                = useBindString("");
	const [password, setPassword, bindPassword]       = useBindString("1234567890");
	const [rePassword, setRePassword, bindRePassword] = useBindString("1234567890");
	const dispatch                                    = useAppDispatch();

	const onSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (password !== rePassword) {
			await openDialog(Alert, {
				body: "The passwords don't match",
				backgroundColor: "light-danger",
			});
		} else {
			dispatch(userSlice.actions.signUpStart({email, password, name}));
		}
	}, [dispatch, email, name, openDialog, password, rePassword]);

	return (
		<FormCard className="bg-gradient--confident-cloud" onSubmit={onSubmit}>
			<FormCardHeader>
				Don't have an account? Register now!
			</FormCardHeader>
			<FormCardInputs>
				<InputBoxControlled
					type="text"
					required
					name="name"
					label="Name"
					{...bindName}
				/>
				<InputBoxControlled
					type="email"
					required
					name="email"
					label="Email"
					{...bindEmail}
				/>
				<InputBoxControlled
					type="password"
					required
					name="password"
					label="Password"
					{...bindPassword}
				/>
				<InputBoxControlled
					type="password"
					required
					name="rePassword"
					label="Confirm Password"
					{...bindRePassword}
				/>
			</FormCardInputs>
			<FormCardFooterButtons>
				<Btn
					extension="lg"
					borderColor="secondary"
					type="submit">Sign Up
				</Btn>
			</FormCardFooterButtons>
		</FormCard>
	);
}

export default SignUpForm;
