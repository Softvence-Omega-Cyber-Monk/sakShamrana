"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentService = void 0;
const stripe_1 = __importDefault(require("stripe"));
const env_1 = require("../../config/env");
const stripe = new stripe_1.default(env_1.envVers.STRIPE.STRIPE_SECRATE_KEY, {
    apiVersion: "2025-11-17.clover",
});
const checkout = async (payload) => {
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
        success_url: `${String(env_1.envVers.SERVER_URL)}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${String(env_1.envVers.SERVER_URL)}/payment/cancel`,
    });
    return session;
};
exports.paymentService = {
    checkout,
};
//# sourceMappingURL=payment.services.js.map