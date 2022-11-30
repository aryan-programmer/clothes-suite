import React, {ChangeEvent, FormEvent} from "react";
import Modal from "react-bootstrap/esm/Modal";
import Btn from "./Btn";
import InputBox from "./InputBox";
import {APPLICATION_NAME} from "../utils/consts";
import {
	createUserDocument,
	FirebaseError,
	signUpWithEmailAndPassword
} from "../utils/firebase/firebase";
import {FirebaseAuthErrorCodes} from "../utils/firebase/firebaseAuthErrorCodes";
import nn from "../lib/functions/nn";

export type SignUpProps_T = {};
export type SignUpState_T = {
	name: string,
	email: string,
	password: string,
	rePassword: string,
	alertVisible: boolean,
	alertMessage: string,
	alertBg: string,
};

export default class SignUpForm extends React.Component<SignUpProps_T, SignUpState_T> {
	constructor (props: SignUpProps_T) {
		super(props);

		this.state = {
			name: "",
			email: "",
			password: "",
			rePassword: "",
			alertMessage: "",
			alertVisible: false,
			alertBg: "light-danger"
		};
	}

	onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const {name, email, password, rePassword} = this.state;
		if (password !== rePassword) {
			this.setState({
				alertMessage: "The passwords don't match",
				alertVisible: true,
				alertBg: "light-danger"
			});
			return;
		}
		try {
			const res = nn(await signUpWithEmailAndPassword(email, password));
			const doc = await createUserDocument(res.user, {displayName: name});
			this.setState({
				alertMessage: "Signed up successfully",
				alertVisible: true,
				alertBg: "light-success"
			});
		} catch (e) {
			if (e instanceof FirebaseError && e.code === FirebaseAuthErrorCodes.EMAIL_EXISTS) {
				this.setState({
					alertMessage: "Email already used to sign up a user",
					alertVisible: true,
					alertBg: "light-danger"
				});
				return;
			} else {
				this.setState({
					alertMessage: "Failed to sign up user",
					alertVisible: true,
					alertBg: "light-danger"
				});
				return;
			}
		}
	};

	onInputBoxChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {name, value} = event.target;
		this.setState({
			[name]: value,
		} as unknown as SignUpState_T);
	};
	onAlertClose     = () => this.setState({alertVisible: false});

	override render () {
		return (
			<>
				<form className="card bg-gradient--confident-cloud rounded-4" onSubmit={this.onSubmit}>
					<div className="card-header add-bg-noise rounded-4 rounded-bottom-0">
						<h2 className="mb-0">Don't have an account? Register now!</h2>
					</div>
					<div className="card-body d-flex flex-column gap-2">
						<InputBox
							type="text"
							required
							name="name"
							label="Name"
							value={this.state.name}
							onChange={this.onInputBoxChange}
						/>
						<InputBox
							type="email"
							required
							name="email"
							label="Email"
							value={this.state.email}
							onChange={this.onInputBoxChange}
						/>
						<InputBox
							type="password"
							required
							name="password"
							label="Password"
							value={this.state.password}
							onChange={this.onInputBoxChange}
						/>
						<InputBox
							type="password"
							required
							name="rePassword"
							label="Confirm Password"
							value={this.state.rePassword}
							onChange={this.onInputBoxChange}
						/>
					</div>
					<div className="card-footer rounded-4 rounded-top-0">
						<Btn
							extension="lg"
							borderColor="secondary"
							className=""
							type="submit">Sign Up
						</Btn>
					</div>
				</form>

				<Modal
					show={this.state.alertVisible}
					onHide={this.onAlertClose}
					className={`shadows-bg-${this.state.alertBg}`}
					contentClassName={`bg-${this.state.alertBg}`}>
					<Modal.Header closeButton className="pb-0">
						<Modal.Title><h3 className="mb-0">{APPLICATION_NAME} - Registration Form</h3></Modal.Title>
					</Modal.Header>
					<hr/>
					<Modal.Body>{this.state.alertMessage}</Modal.Body>
					<hr/>
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
