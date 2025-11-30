import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { paymentService } from "./payment.services";
import Stripe from "stripe";
import { envVers } from "../../config/env";

const stripe = new Stripe(envVers.STRIPE.STRIPE_SECRATE_KEY!, {
  apiVersion: "2025-11-17.clover",
});

const checkOut = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = {
        ...req.body,
        userId: req.authUser?._id,
        email: req.authUser?.email,
    };

    const session = await paymentService.checkout(payload);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Stripe Checkout URL Generated",
        data: {
            url: session.url,
            sessionId: session.id,
        },
    });
});



const stripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string // Web Hook Secrate
    );
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      const sessionId = paymentIntent.id;
      const userId = paymentIntent.metadata?.userId;
      const paymentType = paymentIntent.metadata?.planName;
      const amount = paymentIntent.amount / 100;


    }

    res.status(200).send("✅ Event processed");
  } catch (err: any) {
    console.error(err);
    res.status(400).send(`Webhook error: ${err.message}`);
  }
};


const successpayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Payment Success",
        data: null
    })
});

const faildPayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Payment Failed",
        data: null
    })
})

export const paymentController = {
    checkOut,
    successpayment,
    faildPayment
}