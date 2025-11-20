import { Router } from "express";
import { authController } from "./auth.controller";

const authRouter = Router();

authRouter.post("/login" , authController.loginUser);
authRouter.post("/accessToken" ,  authController.createAccessTokenUserRefreshToken);
authRouter.post("/socialLogin" , authController.SocialLogin);

export default authRouter;