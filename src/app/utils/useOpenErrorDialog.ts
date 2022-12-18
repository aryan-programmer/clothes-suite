import {useCallback} from "react";
import {Alert, AlertData_T} from "../../lib/dialogs/basic-dialogs/Alert";
import {CloseReason} from "../../lib/dialogs/basic-dialogs/close-reason";
import {useOpenDialog} from "../../lib/dialogs/DialogContext";

export function useOpenErrorDialog (): (
	body: AlertData_T["body"],
	data?: Omit<AlertData_T, "body">
) => Promise<CloseReason> {
	const open = useOpenDialog();
	return useCallback((body: AlertData_T["body"], data?: Omit<AlertData_T, "body">) => {
		return open(Alert, {body, backgroundColor: "light-danger", ...data});
	}, [open]);
}

export function useOpenSuccessDialog (): (
	body: AlertData_T["body"],
	data?: Omit<AlertData_T, "body">
) => Promise<CloseReason> {
	const open = useOpenDialog();
	return useCallback((body: AlertData_T["body"], data?: Omit<AlertData_T, "body">) => {
		return open(Alert, {body, backgroundColor: "light-success", ...data});
	}, [open]);
}

