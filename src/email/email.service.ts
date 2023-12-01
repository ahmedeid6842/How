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

    async sendVerificationEmail(email: string, verificationCode: string) {
        const message = {
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject: 'How Account Verification',
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; background-color: #f9f9f9;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <img src="https://github.com/ahmedeid6842/How/assets/57197702/754529bf-a888-499f-afd2-8d910f498f93" alt="Company Logo" style="max-width: 150px;">
                </div>
                <div style="background-color: #fff; padding: 20px; border-radius: 8px;">
                    <h2 style="color: #333; margin-bottom: 20px;">Account Verification</h2>
                    <p style="color: #555;">Dear User,</p>
                    <p style="color: #555;">Welcome to our platform! To get started, please verify your account using the code below:</p>
                    <div style="text-align: center; background-color: #f5f5f5; padding: 15px; margin-bottom: 20px; border-radius: 8px;">
                        <h3 style="margin: 0; font-size: 24px; color: #333;">${verificationCode}</h3>
                    </div>
                    <p style="color: #555;">This code will expire in 1 hour. Thank you for choosing our service!</p>
                    <p style="color: #555; margin-top: 20px;">If you didn't sign up for an account, please ignore this email.</p>
                    <p style="color: #555;">Best Regards,<br>How</p>
                </div>
            </div>
            `,
        };

        return await this.transporter.sendMail(message);
    }
}