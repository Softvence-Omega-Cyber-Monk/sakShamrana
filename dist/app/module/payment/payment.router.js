"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const protect_1 = require("../../middleware/protect");
const payment_controller_1 = require("./payment.controller");
const paymentRouter = (0, express_1.Router)();
paymentRouter.post("/checkout", (0, protect_1.checkAuths)(), payment_controller_1.paymentController.checkOut);
paymentRouter.get("/success", payment_controller_1.paymentController.successpayment);
paymentRouter.get("/payment", payment_controller_1.paymentController.faildPayment);
exports.default = paymentRouter;
//# sourceMappingURL=payment.router.js.map