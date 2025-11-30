import Stripe from "stripe";
import { IPayment } from "./payment.interfaces";
export declare const paymentService: {
    checkout: (payload: Partial<IPayment>) => Promise<Stripe.Response<Stripe.Checkout.Session>>;
};
//# sourceMappingURL=payment.services.d.ts.map