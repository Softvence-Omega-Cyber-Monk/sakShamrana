"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleRoute = void 0;
const user_router_1 = __importDefault(require("../module/user/user.router"));
exports.moduleRoute = [
    {
        path: "/user",
        routes: user_router_1.default // Use for example
    }
];
//# sourceMappingURL=route.js.map