import { Router } from "express";
import { userController } from "./user.controller";
import { checkAuths } from "../../middleware/protect";

const userRouter = Router();


userRouter.post("/create" , userController.createUser);
userRouter.patch("/update_faith_speaciality", checkAuths(), userController.updateFaithSpirituality);
userRouter.patch("/update_professional_information" , checkAuths() , userController.updateProfessionalInformation);
userRouter.post("/optVerify" , userController.otpVerify);


export default userRouter;