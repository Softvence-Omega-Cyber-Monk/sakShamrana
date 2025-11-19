import mongoose from "mongoose";
import { IPayment } from "./payment.interfaces";


const paymentSchema = new mongoose.Schema<IPayment>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    planName: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});


export const Payment = mongoose.model<IPayment>("Payment", paymentSchema);