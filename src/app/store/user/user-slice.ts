import {User} from "@firebase/auth";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Optional} from "../../../lib/types";

export const USER_STATE_NAME = "userState";

export type UserState_T = {
	user: Optional<User>,
	isLoading: boolean
}

const initialState: UserState_T = {
	user: null,
	isLoading: false,
};

export type SignUpPayload_T = { email: string, password: string, name: string };

export const userSlice = createSlice({
	name: USER_STATE_NAME,
	initialState,
	reducers: {
		restoreUserSession (state) {
		},
		restoredUserSession (state, action: PayloadAction<Optional<User>>) {
			state.user = action.payload;
		},
		checkRedirectResult (state) {
		},
		emailSignInStart (state, action: PayloadAction<{ email: string, password: string }>) {
		},
		signInSuccess (state, action: PayloadAction<User>) {
			state.user = action.payload;
		},
		signInFailed (state, action: PayloadAction<any>) {
		},
		signUpStart (state, action: PayloadAction<SignUpPayload_T>) {
		},
		signUpSuccess (state, action: PayloadAction<User>) {
			state.user = action.payload;
		},
		signUpFailed (state, action: PayloadAction<any>) {
		},
		signOut (state) {
			state.user = null;
		},
	},
});
