import {isEmpty} from "lodash";
import {observer} from "mobx-react";
import React, {useEffect} from "react";
import {useNavigate} from "react-router";
import {useResolve} from "../../../lib/injector/useResolve";
import CartStore from "../../store/cart/cart-store";
import {CurrencySymbol} from "../../utils/consts";
import {stripe} from "../../utils/stripe";
import {useOpenErrorDialog, useOpenSuccessDialog} from "../../utils/useOpenErrorDialog";

export type PaymentFinishedPageProps_T = {};

export default observer(function PaymentFinishedPage (props: PaymentFinishedPageProps_T) {
	const openSuccessDialog = useOpenSuccessDialog();
	const openErrorDialog   = useOpenErrorDialog();
	const cartStore         = useResolve(CartStore);
	const navigate          = useNavigate();
	useEffect(() => void (async () => {
		// Retrieve the "payment_intent_client_secret" query parameter appended to
		// your return_url by Stripe.js
		const clientSecret = new URLSearchParams(window.location.search).get(
			'payment_intent_client_secret'
		);

		if (clientSecret == null || isEmpty(clientSecret)) return;
		const st = await stripe;
		if (st == null) return;

		const paymentIntent = (await st.retrievePaymentIntent(clientSecret)).paymentIntent;
		if (paymentIntent == null) return;
		if (paymentIntent.status !== "succeeded") {
			let error: string;
			switch (paymentIntent.status) {
				case 'processing':
					error = ("Payment processing. We'll update you when payment is received.");
					break;
				case 'requires_payment_method':
					error = ('Payment failed. Please try another payment method.');
					break;
				default:
					error = ('Something went wrong.');
					break;
			}
			await openErrorDialog(error);
			return
		}

		await openSuccessDialog(
			<h4>Success! Payment of {CurrencySymbol}{(paymentIntent.amount / 100).toFixed(2)} received.</h4>);
		cartStore.clear();
		navigate("/");

		// eslint-disable-next-line react-hooks/exhaustive-deps
	})(), []);
	return (
		<div>

		</div>
	);
})
