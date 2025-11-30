import authRouter from "../module/auth/auth.router";
import paymentRouter from "../module/payment/payment.router";
import userRouter from "../module/user/user.router";

export const moduleRoute = [
    {
        path: "/user",
        routes: userRouter // Use for example
    },
    {
        path: "/auth",
        routes: authRouter
    },
    {
        path: "/payment",
        routes: paymentRouter
    }
];

