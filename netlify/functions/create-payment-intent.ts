import {Handler} from '@netlify/functions';
import * as dotenv from 'dotenv';
import Stripe from "stripe";
import nn from "../../src/lib/functions/nn";
import {assertTypeOf} from "../../src/lib/types";
import {CreatePaymentIntent_ResponseBody_T} from "../types";
import {isCreatePaymentIntentRequestBody} from "../types.guard";

dotenv.config({path: ".env.local-server"});
const stripe = new Stripe(nn(process.env.STRIPE_PRIVATE_API_KEY), {
	apiVersion: "2022-11-15"
});

const handler: Handler = async (event, context) => {
	try {
		const body = JSON.parse(nn(event.body));
		assertTypeOf(body, isCreatePaymentIntentRequestBody);
		const amount        = Math.round(body.amount * 100);
		const paymentIntent = await stripe.paymentIntents.create({
			amount: amount,
			currency: "inr",
			automatic_payment_methods: {
				enabled: true,
			},
		});
		return {
			statusCode: 200,
			body: JSON.stringify({paymentIntent} as CreatePaymentIntent_ResponseBody_T)
		};
	} catch (e) {
		console.log(e)
		return {
			statusCode: 400,
			body: JSON.stringify({error: e})
		};
	}
}

export {handler}
