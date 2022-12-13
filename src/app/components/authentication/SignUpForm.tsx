import React, {ChangeEvent, FormEvent} from "react";
import {Alert} from "../../../lib/dialogs/basic-dialogs/Alert";
import {DialogContext, IDialogOpener} from "../../../lib/dialogs/DialogContext";
import nn from "../../../lib/functions/nn";
import {Optional} from "../../../lib/types";
import {
	createUserDocumentOrOverrideData,
	FirebaseAuthErrorCodes,
	FirebaseError,
	signUpWithEmailAndPassword
} from "../../utils/firebase";
import Btn from "../common/Btn";
import {FormCard, FormCardFooterButtons, FormCardHeader, FormCardInputs} from "../common/FormCard";
import {InputBox} from "../common/InputBoxes";

export type SignUpProps_T = {};
export type SignUpState_T = {
	name: string,
	email: string,
	password: string,
	rePassword: string,
};

class SignUpForm extends React.Component<SignUpProps_T, SignUpState_T> {
	static contextType = DialogContext;
	context!: IDialogOpener;

	constructor (props: SignUpProps_T) {
		super(props);

		this.state = {
			name: "",
			email: "",
			password: "",
			rePassword: "",
		};
	}

	onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const {name, email, password, rePassword} = this.state;
		let error: Optional<string>               = null;
		if (password !== rePassword) {
			error = "The passwords don't match";
		} else {
			try {
				const res = nn(await signUpWithEmailAndPassword(email, password));
				await createUserDocumentOrOverrideData(res.user, {displayName: name});
				await this.context.openDialog(Alert, {
					body: "Signed in successfully",
					backgroundColor: "light-success",
				});
				return;
			} catch (e) {
				error = "Failed to sign up user";
				if (e instanceof FirebaseError) {
					if (e.code === FirebaseAuthErrorCodes.EMAIL_EXISTS)
						error = "Email already used to sign up a user";
				}
			}
		}
		if ((error?.length ?? 0) > 0)
			await this.context.openDialog(Alert, {
				body: error,
				backgroundColor: "light-danger",
			});
	};

	onInputBoxChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {name, value} = event.target;
		this.setState({
			[name]: value,
		} as unknown as SignUpState_T);
	};

	override render () {
		return (
			<FormCard className="bg-gradient--confident-cloud" onSubmit={this.onSubmit}>
				<FormCardHeader>
					Don't have an account? Register now!
				</FormCardHeader>
				<FormCardInputs>
					<InputBox
						type="text"
						required
						name="name"
						label="Name"
						onChange={this.onInputBoxChange}
					/>
					<InputBox
						type="email"
						required
						name="email"
						label="Email"
						onChange={this.onInputBoxChange}
					/>
					<InputBox
						type="password"
						required
						name="password"
						label="Password"
						onChange={this.onInputBoxChange}
					/>
					<InputBox
						type="password"
						required
						name="rePassword"
						label="Confirm Password"
						onChange={this.onInputBoxChange}
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
}

export default SignUpForm;
