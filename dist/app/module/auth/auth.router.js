"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const authRouter = (0, express_1.Router)();
authRouter.post("/login", auth_controller_1.authController.loginUser);
authRouter.post("/accessToken", auth_controller_1.authController.createAccessTokenUserRefreshToken);
authRouter.post("/socialLogin", auth_controller_1.authController.SocialLogin);
exports.default = authRouter;
//# sourceMappingURL=auth.router.js.map