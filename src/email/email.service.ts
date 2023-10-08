import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer'
@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;
    private email: string;
    private password: string;

    constructor() {
        this.email = process.env.NODEMAILER_EMAIL;
        this.password = process.env.NODEMAILER_PASSWORD;

        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: this.email,
                pass: this.password,
            }
        })
    }
    async sendResetPasswordEmail(email: string, resetPasswordUrl: string) {
        const message = {
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject: 'Password Reset',
            text: `Click the following link to reset your password: ${resetPasswordUrl}`,
        };

        return await this.transporter.sendMail(message);
    }
}