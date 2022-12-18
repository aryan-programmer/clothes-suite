import {Elements, PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {StripeElementsOptions} from "@stripe/stripe-js";
import {isEmpty} from "lodash";
import {observer} from "mobx-react";
import React, {FormEvent, useCallback, useEffect, useState} from "react";
import {CreatePaymentIntent_RequestBody_T, CreatePaymentIntent_ResponseBody_T} from "../../../../netlify/types";
import nn from "../../../lib/functions/nn";
import roundToTwo from "../../../lib/functions/roundToTwo";
import {useResolve} from "../../../lib/injector/useResolve";
import CartStore from "../../store/cart/cart-store";
import {CurrencySymbol} from "../../utils/consts";
import {fontUrl} from "../../utils/css";
import {stripe} from "../../utils/stripe";
import {useOpenErrorDialog} from "../../utils/useOpenErrorDialog";
import Btn from "../common/Btn";
import {FormCardFooterButtons, FormCardHeader, FormCardInputs} from "../common/FormCard";
import {LoaderContainer} from "../common/loader";
import {PaymentFormCard, stripeAppearance} from "./consts";

export type PaymentFormProps_T = {};

const PaymentForm = observer(function () {
	const stripe                  = useStripe();
	const elements                = useElements();
	const cartState               = useResolve(CartStore);
	const openErrorDialog         = useOpenErrorDialog();
	const amount                  = cartState.totalCost;
	const [isLoading, setLoading] = useState(false);

	const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setLoading(true);
		const {error} = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: window.location.origin + "/payment/success",
			},
		});

		setLoading(false);
		if (error != null && error.message != null && !isEmpty(error.message)) {
			openErrorDialog(error.message);
		}
	}, [elements, openErrorDialog, stripe]);


	return <PaymentFormCard onSubmit={handleSubmit}>
		<FormCardHeader>Confirm payment of a total of {CurrencySymbol}{roundToTwo(amount)}</FormCardHeader>
		<FormCardInputs>
			{isLoading ? <LoaderContainer /> : null}
			<PaymentElement options={{layout: "tabs"}}></PaymentElement>
		</FormCardInputs>
		<FormCardFooterButtons>
			<Btn extension="lg" borderColor="warning" type="submit">Pay now</Btn>
		</FormCardFooterButtons>
	</PaymentFormCard>;
})

export default observer(function PaymentPage (props: PaymentFormProps_T) {
	const cartState                       = useResolve(CartStore);
	const [clientSecret, setClientSecret] = useState("");
	const amount                          = cartState.totalCost;

	useEffect(() => void (async () => {
		if (Math.round(amount * 100) === 0) return;
		//*
		const response = await fetch("/.netlify/functions/create-payment-intent", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({amount: amount} as CreatePaymentIntent_RequestBody_T),
		});
		const json     = await response.json() as CreatePaymentIntent_ResponseBody_T;
		/*/
		const json =  as CreatePaymentIntent_ResponseBody_T;
		//*/
		console.log(json);
		setClientSecret(nn(json.paymentIntent.client_secret));
	})(), [amount]);

	const options: StripeElementsOptions = {
		clientSecret: clientSecret,
		appearance: stripeAppearance,
		fonts: [{cssSrc: fontUrl}]
	};

	return (
		Math.round(amount * 100) === 0 ?
			<h3>Please add some items to the cart before payment.</h3>:
		isEmpty(clientSecret) ? null :
			<Elements stripe={stripe} options={options}>
				<PaymentForm />
			</Elements>
	);
});
