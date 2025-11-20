"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const protect_1 = require("../../middleware/protect");
const userRouter = (0, express_1.Router)();
userRouter.post("/create", user_controller_1.userController.createUser);
userRouter.post("/optVerify", user_controller_1.userController.otpVerify);
userRouter.patch("/update_faith_speaciality", (0, protect_1.checkAuths)(), user_controller_1.userController.updateFaithSpirituality);
userRouter.patch("/update_professional_information", (0, protect_1.checkAuths)(), user_controller_1.userController.updateProfessionalInformation);
userRouter.patch("/update_life_style_info", (0, protect_1.checkAuths)(), user_controller_1.userController.updateLifeStyleInformation);
userRouter.patch("/update_intarest", (0, protect_1.checkAuths)(), user_controller_1.userController.updateIntarest);
userRouter.patch("/remove_intarest", (0, protect_1.checkAuths)(), user_controller_1.userController.removeInterests);
userRouter.patch("/updateBio", (0, protect_1.checkAuths)(), user_controller_1.userController.updateBio);
userRouter.patch("/update_prefarances", (0, protect_1.checkAuths)(), user_controller_1.userController.updatePreferences);
exports.default = userRouter;
//# sourceMappingURL=user.router.js.map