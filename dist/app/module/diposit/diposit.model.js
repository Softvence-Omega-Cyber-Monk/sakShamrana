"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Diposit = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const diposit_interface_1 = require("./diposit.interface");
const dipositSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    dipositPlanName: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    dipositeStatus: {
        type: String,
        enum: Object.values(diposit_interface_1.EPaymentStatus),
        default: diposit_interface_1.EPaymentStatus.PENDING
    },
    refandStatus: {
        type: String,
        enum: Object.values(diposit_interface_1.EPaymentStatus),
        default: diposit_interface_1.EPaymentStatus.PENDING
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.Diposit = mongoose_1.default.model("Diposit", dipositSchema);
//# sourceMappingURL=diposit.model.js.map