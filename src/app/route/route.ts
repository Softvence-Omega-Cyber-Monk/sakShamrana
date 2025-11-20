import authRouter from "../module/auth/auth.router";
import userRouter from "../module/user/user.router";

export const moduleRoute = [
    {
        path: "/user",
        routes: userRouter // Use for example
    },
    {
        path: "/auth",
        routes: authRouter
    }
];

