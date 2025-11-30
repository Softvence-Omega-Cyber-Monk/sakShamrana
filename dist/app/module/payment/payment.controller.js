"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = require("../../utils/sendResponse");
const payment_services_1 = require("./payment.services");
const stripe_1 = __importDefault(require("stripe"));
const env_1 = require("../../config/env");
const stripe = new stripe_1.default(env_1.envVers.STRIPE.STRIPE_SECRATE_KEY, {
    apiVersion: "2025-11-17.clover",
});
const checkOut = (0, catchAsync_1.default)(async (req, res, next) => {
    const payload = {
        ...req.body,
        userId: req.authUser?._id,
        email: req.authUser?.email,
    };
    const session = await payment_services_1.paymentService.checkout(payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Stripe Checkout URL Generated",
        data: {
            url: session.url,
            sessionId: session.id,
        },
    });
});
const stripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET // Web Hook Secrate
        );
    }
    catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    try {
        if (event.type === "payment_intent.succeeded") {
            const paymentIntent = event.data.object;
            const sessionId = paymentIntent.id;
            const userId = paymentIntent.metadata?.userId;
            const paymentType = paymentIntent.metadata?.planName;
            const amount = paymentIntent.amount / 100;
        }
        res.status(200).send("✅ Event processed");
    }
    catch (err) {
        console.error(err);
        res.status(400).send(`Webhook error: ${err.message}`);
    }
};
const successpayment = (0, catchAsync_1.default)(async (req, res, next) => {
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Payment Success",
        data: null
    });
});
const faildPayment = (0, catchAsync_1.default)(async (req, res, next) => {
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Payment Failed",
        data: null
    });
});
exports.paymentController = {
    checkOut,
    successpayment,
    faildPayment
};
//# sourceMappingURL=payment.controller.js.map