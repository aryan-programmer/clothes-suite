import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {ChangeEvent, FormEvent} from "react";
import {IDialogOpener, withDialog} from "../../lib/dialogs/DialogContext";
import nn from "../../lib/functions/nn";
import {
	createUserDocumentOrOverrideData,
	FirebaseError,
	getRedirectResult,
	signInWithEmailAndPassword,
	signInWithGoogleRedirect,
} from "../utils/firebase/firebase";
import {FirebaseAuthErrorCodes} from "../utils/firebase/firebaseAuthErrorCodes";
import {Alert} from "../../lib/dialogs/basic-dialogs/Alert";
import Btn from "./common/Btn";
import InputBox from "./common/InputBox";

export type SignInProps_T = IDialogOpener & {};
export type SignInState_T = {
	email: string,
	password: string,
};

class SignInForm extends React.Component<SignInProps_T, SignInState_T> {
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
		const doc = await createUserDocumentOrOverrideData(credential.user);
		await this.props.openDialog(Alert, {
			body: "Signed in successfully",
			backgroundColor: "light-success",
		})
	}

	onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const {email, password} = this.state;
		try {
			const res = nn(await signInWithEmailAndPassword(email, password));
			await this.props.openDialog(Alert, {
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
			await this.props.openDialog(Alert, {
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
				<form
					className="card bg-gradient--tempting-azure rounded-4 mb-3 shadows-bg-light-primary"
					onSubmit={this.onSubmit}>
					<div className="card-header add-bg-noise rounded-4 rounded-bottom-0">
						<h2 className="mb-0">Already have an account? Sign in here.</h2>
					</div>
					<div className="card-body d-flex flex-column gap-2">
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
					</div>
					<div className="card-footer rounded-4 rounded-top-0 d-flex gap-3">
						<Btn
							extension="lg"
							borderColor="primary"
							className=""
							type="submit">Sign In
						</Btn>
						<Btn extension="lg" className="" borderColor="primary" onClick={signInWithGoogleRedirect}>
							<FontAwesomeIcon icon={["fab", "google"]} /> Sign in with Google
						</Btn>
					</div>
				</form>
			</>
		);
	}
}

export default withDialog(SignInForm);
