"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const paymentSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
exports.Payment = mongoose_1.default.model("Payment", paymentSchema);
//# sourceMappingURL=payment.mode.js.map