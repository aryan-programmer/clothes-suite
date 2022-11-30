import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {ChangeEvent, FormEvent} from "react";
import Modal from "react-bootstrap/esm/Modal";
import nn from "../../lib/functions/nn";
import {APPLICATION_NAME} from "../utils/consts";
import {
	createUserDocument,
	FirebaseError,
	getRedirectResult,
	signInWithEmailAndPassword,
	signInWithGoogleRedirect,
} from "../utils/firebase/firebase";
import {FirebaseAuthErrorCodes} from "../utils/firebase/firebaseAuthErrorCodes";
import Btn from "./common/Btn";
import InputBox from "./common/InputBox";

export type SignInProps_T = {};
export type SignInState_T = {
	email: string,
	password: string,
	alertVisible: boolean,
	alertMessage: string,
	alertBg: string,
};

export default class SignInForm extends React.Component<SignInProps_T, SignInState_T> {
	constructor (props: SignInProps_T) {
		super(props);

		this.state = {
			email: "",
			password: "",
			alertMessage: "",
			alertVisible: false,
			alertBg: "light-danger"
		};
	}

	async componentDidMount () {
		const credential = await getRedirectResult();
		if (credential == null) return;
		const doc = await createUserDocument(credential.user);
		this.setState({
			alertMessage: "Signed in successfully",
			alertVisible: true,
			alertBg: "light-success"
		});
	}

	onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const {email, password} = this.state;
		try {
			const res = nn(await signInWithEmailAndPassword(email, password));
			this.setState({
				alertMessage: "Signed in successfully",
				alertVisible: true,
				alertBg: "light-success"
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
			this.setState({
				alertMessage: message,
				alertVisible: true,
				alertBg: "light-danger"
			});
			return;
		}
	};

	onInputBoxChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {name, value} = event.target;
		this.setState({
			[name]: value,
		} as unknown as SignInState_T);
	};
	onAlertClose     = () => this.setState({alertVisible: false});

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
				<Modal
					show={this.state.alertVisible}
					onHide={this.onAlertClose}
					className={`shadows-bg-${this.state.alertBg}`}
					contentClassName={`bg-${this.state.alertBg}`}>
					<Modal.Header closeButton className="pb-0">
						<Modal.Title><h3 className="mb-0">{APPLICATION_NAME} - Sign Up Form</h3></Modal.Title>
					</Modal.Header>
					<hr />
					<Modal.Body>{this.state.alertMessage}</Modal.Body>
					<hr />
					<Modal.Footer className="p-2 pt-0">
						<Btn
							borderColor="quaternary"
							onClick={this.onAlertClose}
							type="button">
							Ok
						</Btn>
					</Modal.Footer>
				</Modal>
			</>
		);
	}
}
