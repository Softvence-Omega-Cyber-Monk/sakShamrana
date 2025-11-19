import { Router } from "express";
import { userController } from "./user.controller";

const userRouter = Router();


userRouter.post("/create" , userController.createUser);
userRouter.post("/optVerify" , userController.otpVerify);


export default userRouter;