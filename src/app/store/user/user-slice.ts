import {User} from "@firebase/auth";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Optional} from "../../../lib/types";

export const USER_STATE_NAME = "userState";

export type UserState_T = {
	user: Optional<User>
}

const initialState: UserState_T = {
	user: null
};

export const userSlice = createSlice({
	name: USER_STATE_NAME,
	initialState,
	reducers: {
		setUser (state, action: PayloadAction<Optional<User>>) {
			state.user = action.payload;
		}
	},
})
