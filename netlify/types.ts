import Stripe from "stripe";

/** @see {isCreatePaymentIntentRequestBody} ts-auto-guard:type-guard */
export type CreatePaymentIntent_RequestBody_T = {
	amount: number
};

export type CreatePaymentIntent_ResponseBody_T = {
	paymentIntent: Stripe.Response<Stripe.PaymentIntent>
};
