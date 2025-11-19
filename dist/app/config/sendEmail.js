"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const env_1 = require("./env");
const transport = nodemailer_1.default.createTransport({
    secure: true,
    auth: {
        user: env_1.envVers.SEND_EMAIL.SMTP_USER,
        pass: env_1.envVers.SEND_EMAIL.SMTP_PASS
    },
    port: Number(env_1.envVers.SEND_EMAIL.SMTP_PORT),
    host: env_1.envVers.SEND_EMAIL.SMTP_HOST
});
;
const sendEmail = async ({ to, subject, templateName, templateData, attachments }) => {
    try {
        const templatePath = path_1.default.join(__dirname, `templates/${templateName}.ejs`);
        const html = await ejs_1.default.renderFile(templatePath, templateData);
        const info = await transport.sendMail({
            from: env_1.envVers.SEND_EMAIL.SMTP_FORM,
            to: to,
            subject: subject,
            html: html,
            attachments: attachments?.map((item) => ({
                filename: item.filename,
                content: item.content,
                contentType: item.contentType
            }))
        });
        console.log(`/21131/ Email send to ${to} : ${info.messageId}`);
    }
    catch (error) {
        console.log(`Email Error`);
        throw new AppError_1.default(400, "Email otp send faild.");
    }
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendEmail.js.map