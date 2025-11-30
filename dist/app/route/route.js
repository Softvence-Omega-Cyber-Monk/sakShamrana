"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleRoute = void 0;
const auth_router_1 = __importDefault(require("../module/auth/auth.router"));
const payment_router_1 = __importDefault(require("../module/payment/payment.router"));
const user_router_1 = __importDefault(require("../module/user/user.router"));
exports.moduleRoute = [
    {
        path: "/user",
        routes: user_router_1.default // Use for example
    },
    {
        path: "/auth",
        routes: auth_router_1.default
    },
    {
        path: "/payment",
        routes: payment_router_1.default
    }
];
//# sourceMappingURL=route.js.map