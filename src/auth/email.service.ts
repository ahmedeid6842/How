import { Injectable } from "@nestjs/common";

@Injectable()
export class EmailService {
    async sendResetPasswordEmail(email: string, resetPasswordUrl: string){

    }
}