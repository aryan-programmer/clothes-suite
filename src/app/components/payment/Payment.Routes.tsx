import {observer} from "mobx-react";
import React from "react";
import {Route, Routes} from "react-router-dom";
import PaymentPage from "./Payment.Page";
import PaymentFinishedPage from "./PaymentFinished.Page";

export type PaymentRoutesProps_T = {};

export default observer(function PaymentRoutes (props: PaymentRoutesProps_T) {
	return (
		<Routes>
			<Route index element={<PaymentPage />} />
			<Route path="/success" element={<PaymentFinishedPage/>}/>
		</Routes>
	);
});
