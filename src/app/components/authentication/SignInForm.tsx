import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {ChangeEvent, FormEvent} from "react";
import {Alert} from "../../../lib/dialogs/basic-dialogs/Alert";
import {DialogContext, IDialogOpener} from "../../../lib/dialogs/DialogContext";
import nn from "../../../lib/functions/nn";
import {
	createUserDocumentOrOverrideData,
	FirebaseAuthErrorCodes,
	FirebaseError,
	getRedirectResult,
	signInWithEmailAndPassword,
	signInWithGoogleRedirect
} from "../../utils/firebase";
import Btn from "../common/Btn";
import {FormCard, FormCardFooterButtons, FormCardHeader, FormCardInputs} from "../common/FormCard";
import {InputBox} from "../common/InputBoxes";

export type SignInProps_T = {};
export type SignInState_T = {
	email: string,
	password: string,
};

class SignInForm extends React.Component<SignInProps_T, SignInState_T> {
	static contextType = DialogContext;
	context!: IDialogOpener;

	constructor (props: SignInProps_T) {
		super(props);

		this.state = {
			email: "",
			password: "",
		};
	}

	async componentDidMount () {
		const credential = await getRedirectResult();
		if (credential == null) {
			return;
		}
		await createUserDocumentOrOverrideData(credential.user);
		await this.context.openDialog(Alert, {
			body: "Signed in successfully",
			backgroundColor: "light-success",
		})
	}

	onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const {email, password} = this.state;
		try {
			nn(await signInWithEmailAndPassword(email, password));
			await this.context.openDialog(Alert, {
				body: "Signed in successfully",
				backgroundColor: "light-success",
			});
		} catch (e) {
			let message = "Failed to sign up user";
			if (e instanceof FirebaseError) {
				if (e.code === FirebaseAuthErrorCodes.INVALID_PASSWORD)
					message = "Invalid email or password";
				else if (e.code === FirebaseAuthErrorCodes.USER_NOT_FOUND)
					message = "No user with that email was found";
			}
			console.log(e);
			await this.context.openDialog(Alert, {
				body: message,
				backgroundColor: "light-danger",
			})
			return;
		}
	};

	onInputBoxChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {name, value} = event.target;
		this.setState({
			[name]: value,
		} as unknown as SignInState_T);
	};

	override render () {
		return (
			<>
				<FormCard
					className="bg-gradient--tempting-azure mb-3 shadows-bg-light-primary"
					onSubmit={this.onSubmit}>
					<FormCardHeader>
						Already have an account? Sign in here.
					</FormCardHeader>
					<FormCardInputs>
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
}

export default SignInForm;
