"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJwtToken = void 0;
const env_1 = require("../config/env");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJwtToken = (data) => {
    const payload = {
        userId: data._id,
        email: data.email,
        role: data.role
    };
    const accessToken = jsonwebtoken_1.default.sign(payload, env_1.envVers.JWT_ACCESS_SECRATE, { expiresIn: "7d" });
    const refreshToken = jsonwebtoken_1.default.sign(payload, env_1.envVers.JWT_REFRESH_SECRATE, { expiresIn: "30d" });
    return { accessToken, refreshToken };
};
exports.generateJwtToken = generateJwtToken;
//# sourceMappingURL=generateJwtToken.js.map