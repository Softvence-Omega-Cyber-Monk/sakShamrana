import mongoose from "mongoose";
import { IPayment, PStatus } from "./payment.interfaces";


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
    },
    paymentStatus: {
        type: String,
        enum: PStatus,
        default: PStatus.PENDING
    }
}, {
    timestamps: true,
    versionKey: false
});


export const Payment = mongoose.model<IPayment>("Payment", paymentSchema);