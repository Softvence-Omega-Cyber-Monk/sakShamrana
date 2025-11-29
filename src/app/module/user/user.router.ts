import { Router } from "express";
import { userController } from "./user.controller";
import { checkAuths } from "../../middleware/protect";
import { multerUpload } from "../../config/multer.config";
import multer from "multer";

const userRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });


userRouter.post("/create", userController.createUser);
userRouter.post("/optVerify", userController.otpVerify);


userRouter.patch("/update_faith_speaciality", checkAuths(), userController.updateFaithSpirituality);
userRouter.patch("/update_professional_information", checkAuths(), userController.updateProfessionalInformation);
userRouter.patch("/update_life_style_info", checkAuths(), userController.updateLifeStyleInformation);
userRouter.patch("/update_intarest", checkAuths(), userController.updateIntarest);
userRouter.patch("/remove_intarest", checkAuths(), userController.removeInterests);
userRouter.patch("/updateBio", checkAuths(), userController.updateBio);
userRouter.patch("/update_prefarances", checkAuths(), userController.updatePreferences);
userRouter.patch("/update_basic_info", checkAuths(), multerUpload.single("profilePicture"), userController.updateBasicInfo);
userRouter.patch("/update_profile_galary", checkAuths(), upload.array("profiles"), userController.updateUserGalaryImage);

export default userRouter;