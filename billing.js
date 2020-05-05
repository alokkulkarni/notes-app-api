import stripePackage from 'stripe';
import handler from "./libs/handler-libs";
import { calculateCost } from "./libs/billing-libs";

export const main = handler(async (event, context) => {

    const { storage, source } = JSON.parse(event.body);
    const amount = calculateCost(storage);
    const description = "scratch charge";

    const stripe = stripePackage(process.env.stripeSecretKey);

    await stripe.charges.create({
        source,
        amount,
        description,
        currency: "usd"
    });

    return { status: true };
});