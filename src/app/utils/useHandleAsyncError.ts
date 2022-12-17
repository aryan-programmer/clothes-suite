import {useCallback} from "react";
import {Alert} from "../../lib/dialogs/basic-dialogs/Alert";
import {useOpenDialog} from "../../lib/dialogs/DialogContext";
import {getMessageFromError} from "./firebase";

export function useHandleAsyncError (defaultMessage = "Unknown error"): (callback: () => Promise<void>) => Promise<void> {
	const openDialog  = useOpenDialog();
	const handleError = useCallback(async (callback: () => Promise<void>) => {
		try {
			await callback();
		} catch (e) {
			console.log(e);
			const err = getMessageFromError(e, defaultMessage);
			await openDialog(Alert, {
				body: err,
				backgroundColor: "light-danger",
			});
		}
	}, [defaultMessage, openDialog]);
	return handleError;
}
