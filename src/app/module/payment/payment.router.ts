import { Router } from "express";
import { checkAuths } from "../../middleware/protect";
import { paymentController } from "./payment.controller";

const paymentRouter = Router();

paymentRouter.post("/checkout", checkAuths(), paymentController.checkOut);
paymentRouter.get("/success", paymentController.successpayment);
paymentRouter.get("/payment", paymentController.faildPayment);

export default paymentRouter;