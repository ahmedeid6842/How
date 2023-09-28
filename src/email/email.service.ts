import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer'
@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.email,
                pass: process.env.password
            }
        })
    }
    async sendResetPasswordEmail(email: string, resetPasswordUrl: string) {

    }
}