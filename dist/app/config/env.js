"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVers = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envChecker = () => {
    const requiredEnv = ["MONGO_URI", "PORT", "DEV_ENVIRONMENT", "SMTP_HOST", "SMTP_PORT", "SMTP_FORM", "SMTP_USER", "SMTP_PASS"];
    requiredEnv.forEach((key) => {
        if (!process.env[key]) {
            throw new Error(`Required env messing : ${key}`);
        }
    });
    return {
        MONGO_URI: process.env.MONGO_URI,
        PORT: process.env.PORT,
        DEV_ENVIRONMENT: process.env.DEV_ENVIRONMENT,
        SEND_EMAIL: {
            SMTP_HOST: process.env.SMTP_HOST,
            SMTP_PORT: process.env.SMTP_PORT,
            SMTP_FORM: process.env.SMTP_FORM,
            SMTP_USER: process.env.SMTP_USER,
            SMTP_PASS: process.env.SMTP_PASS
        }
    };
};
exports.envVers = envChecker();
//# sourceMappingURL=env.js.map