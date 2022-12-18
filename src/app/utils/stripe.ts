import {loadStripe} from "@stripe/stripe-js";
import nn from "../../lib/functions/nn";

export const stripe = loadStripe(nn(process.env.REACT_APP_STRIPE_PUBLIC_KEY));
