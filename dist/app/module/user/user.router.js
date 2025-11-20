"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const protect_1 = require("../../middleware/protect");
const userRouter = (0, express_1.Router)();
userRouter.post("/create", user_controller_1.userController.createUser);
userRouter.patch("/update_faith_speaciality", (0, protect_1.checkAuths)(), user_controller_1.userController.updateFaithSpirituality);
userRouter.patch("/update_professional_information", (0, protect_1.checkAuths)(), user_controller_1.userController.updateProfessionalInformation);
userRouter.post("/optVerify", user_controller_1.userController.otpVerify);
exports.default = userRouter;
//# sourceMappingURL=user.router.js.map