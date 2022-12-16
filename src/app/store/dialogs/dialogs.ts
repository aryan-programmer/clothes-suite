import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {JSXElementConstructor} from "react";
import {DialogComponent_Props_T} from "../../../lib/dialogs/DialogContext";
import {Optional} from "../../../lib/types";

export const DIALOG_STATE_NAME = "dialogState";

export type DialogState_T = {
	Dialog: Optional<JSXElementConstructor<DialogComponent_Props_T<any, any>>>,
	data: any
}

const initialState: DialogState_T = {
	Dialog: null,
	data: null,
};

export const dialogSlice = createSlice({
	name: DIALOG_STATE_NAME,
	initialState,
	reducers: {
		openDialog (state, action: PayloadAction<DialogState_T>) {
			state.Dialog = action.payload.Dialog;
			state.data   = action.payload.data;
		},
		onDialogClose (state) {
			state.Dialog = null;
			state.data   = null;
		},
	},
});


export function openDialogAction<TResult, TData> (
	Dialog: JSXElementConstructor<DialogComponent_Props_T<TResult, TData>>,
	data: TData) {
	return {type: dialogSlice.actions.openDialog.type, payload: {Dialog, data}};
}
