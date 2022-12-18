import {useCallback} from "react";
import {getMessageFromError} from "./firebase";
import {useOpenErrorDialog} from "./useOpenErrorDialog";

export function useHandleAsyncError (defaultMessage = "Unknown error"): (callback: () => Promise<void>) => Promise<void> {
	const openErrorDialog  = useOpenErrorDialog();
	return useCallback(async (callback: () => Promise<void>) => {
		try {
			await callback();
		} catch (e) {
			console.log(e);
			const err = getMessageFromError(e, defaultMessage);
			await openErrorDialog(err);
		}
	}, [defaultMessage, openErrorDialog]);
}
