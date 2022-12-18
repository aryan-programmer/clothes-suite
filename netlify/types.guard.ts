/*
 * Generated type guards for "types.ts".
 * WARNING: Do not manually change this file.
 */
import { CreatePaymentIntent_RequestBody_T } from "./types";

export function isCreatePaymentIntentRequestBody(obj: unknown): obj is CreatePaymentIntent_RequestBody_T {
    const typedObj = obj as CreatePaymentIntent_RequestBody_T
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["amount"] === "number"
    )
}
