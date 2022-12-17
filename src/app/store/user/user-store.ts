import type {User} from "@firebase/auth";
import {action, makeObservable, observable} from "mobx";
import {singleton} from "tsyringe";
import nn from "../../../lib/functions/nn";
import type {Optional} from "../../../lib/types";
import {
	createUserDocumentOrOverrideData,
	getRedirectResult,
	restoreUserSession,
	signInWithEmailAndPassword,
	signOut,
	signUp
} from "../../utils/firebase";

@singleton()
export default class UserStore {
	@observable user: Optional<User>;

	constructor () {
		makeObservable(this);
	}

	@action
	private setUser (user: Optional<User>) {
		this.user = user;
	}

	async restoreUser () {
		const user: Optional<User> = await restoreUserSession();
		if (user == null) {
			return;
		}
		this.setUser(user);
	}

	async checkRedirectResult (): Promise<boolean> {
		const credential = await getRedirectResult();
		if (credential == null) {
			return false;
		}
		await createUserDocumentOrOverrideData(credential.user);
		this.setUser(credential.user);
		return true;
	}

	async emailSignIn (email: string, password: string): Promise<boolean> {
		const user: User = nn(await signInWithEmailAndPassword(email, password));
		this.setUser(user);
		return true;
	}

	async signUp (email: string, password: string, name: string): Promise<boolean> {
		const user: User = nn(await signUp(email, password, name));
		await createUserDocumentOrOverrideData(user, {displayName: name});
		this.setUser(user);
		return true;
	}

	async signOut () {
		this.setUser(null);
		await signOut();
	}
}
