"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const protect_1 = require("../../middleware/protect");
const multer_config_1 = require("../../config/multer.config");
const multer_1 = __importDefault(require("multer"));
const userRouter = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
userRouter.post("/create", user_controller_1.userController.createUser);
userRouter.post("/optVerify", user_controller_1.userController.otpVerify);
userRouter.patch("/update_faith_speaciality", (0, protect_1.checkAuths)(), user_controller_1.userController.updateFaithSpirituality);
userRouter.patch("/update_professional_information", (0, protect_1.checkAuths)(), user_controller_1.userController.updateProfessionalInformation);
userRouter.patch("/update_life_style_info", (0, protect_1.checkAuths)(), user_controller_1.userController.updateLifeStyleInformation);
userRouter.patch("/update_intarest", (0, protect_1.checkAuths)(), user_controller_1.userController.updateIntarest);
userRouter.patch("/remove_intarest", (0, protect_1.checkAuths)(), user_controller_1.userController.removeInterests);
userRouter.patch("/updateBio", (0, protect_1.checkAuths)(), user_controller_1.userController.updateBio);
userRouter.patch("/update_prefarances", (0, protect_1.checkAuths)(), user_controller_1.userController.updatePreferences);
userRouter.patch("/update_basic_info", (0, protect_1.checkAuths)(), multer_config_1.multerUpload.single("profilePicture"), user_controller_1.userController.updateBasicInfo);
userRouter.patch("/update_profile_galary", (0, protect_1.checkAuths)(), upload.array("profiles"), user_controller_1.userController.updateUserGalaryImage);
exports.default = userRouter;
//# sourceMappingURL=user.router.js.map