import Stripe from "stripe";
import { IPayment } from "./payment.interfaces";
import { envVers } from "../../config/env";

const stripe = new Stripe(envVers.STRIPE.STRIPE_SECRATE_KEY, {
    apiVersion: "2025-11-17.clover",
});

const checkout = async (payload: Partial<IPayment>) => {
    const session = await stripe.checkout.sessions.create({
        
        // Only add customer_email if NOT undefined
        ...(payload.email ? { customer_email: payload.email } : {}),

        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: payload?.planName ?? `${payload.planName}`
                    },
                    unit_amount: Number(payload.amount ?? 0) * 100,
                },
                quantity: 1,
            },
        ],

        mode: "payment",

        success_url: `${String(envVers.SERVER_URL)}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${String(envVers.SERVER_URL)}/payment/cancel`,
    });

    return session;
};




export const paymentService = {
    checkout,
};
