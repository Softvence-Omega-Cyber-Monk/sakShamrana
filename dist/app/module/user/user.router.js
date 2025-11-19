"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const userRouter = (0, express_1.Router)();
userRouter.post("/create", user_controller_1.userController.createUser);
userRouter.post("/optVerify", user_controller_1.userController.otpVerify);
exports.default = userRouter;
//# sourceMappingURL=user.router.js.map