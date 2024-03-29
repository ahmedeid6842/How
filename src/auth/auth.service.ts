import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './user.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { EmailService } from '../email/email.service';
import { JwtService } from "@nestjs/jwt"
import { customAlphabet } from 'nanoid';
import { ProfileService } from 'src/profile/profile.service';


@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
        private emailService: EmailService,
        private jwtService: JwtService,
        private profileService: ProfileService) { }

    async register(email: string, userName: string, password: string) {
        // check if user email is unique
        const userByEmail = await this.userService.find(email);
        if (userByEmail.length) {
            throw new BadRequestException(`this email:${email} already exists`);
        }

        // check if user userName is unique 
        const userByName = await this.userService.find(null, userName);
        if (userByName.length) {
            throw new BadRequestException(`this userName: ${userName} already exist`)
        }

        const salt = await bcrypt.genSalt()
        password = await bcrypt.hash(password, salt);

        const verificationCode = this.generateVerificationCode();
        const verificationCodeExpiresAt = this.generateVerificationCodeExpiration();

        const user = await this.userService.create(email, userName, password, verificationCode, verificationCodeExpiresAt);

        await this.emailService.sendVerificationEmail(email, verificationCode);

        return user;
    }

    async login(userCredentials: LoginUserDto) {
        const user = await this.userService.find(userCredentials.email, userCredentials.userName);

        if (!user.length) {
            throw new NotFoundException(`user not found`)
        }

        const verifiedUser = await bcrypt.compare(userCredentials.password, user[0].password)

        if (!verifiedUser) {
            throw new BadRequestException('incorrect password')
        }

        return user[0];
    }

    async sendResetPasswordEmail(userData: any) {
        const [user] = await this.userService.find(userData.email, userData.userName);

        if (!user) {
            throw new NotFoundException(`user not found`)
        }

        const token = this.generateResetPasswordToken(user.id)
        const resetPasswordUrl = process.env.HOW_URL || `${process.env.HOST}:${process.env.PORT}/auth/reset-password/${token}`

        await this.emailService.sendResetPasswordEmail(user.email, resetPasswordUrl);
    }

    async resetPassword(token: string, password: string) {
        const { userId } = await this.jwtService.decode(token) as { userId: string };

        if (!userId) {
            throw new BadRequestException('Invalid reset password token.');
        }

        const salt = await bcrypt.genSalt()
        password = await bcrypt.hash(password, salt);
        return await this.userService.update(userId, { password })
    }

    async verifyEmail(email: string, verificationCode: string) {
        const [user] = await this.userService.find(email);

        if (!user) {
            throw new NotFoundException(`user not found`)
        }

        if (user.isVerified) {
            throw new BadRequestException(`user already verified`)
        }

        if (user.verificationCode !== verificationCode) {
            throw new BadRequestException(`invalid verification code`)
        }

        if (user.verificationCodeExpiresAt < new Date()) {
            throw new BadRequestException(`verification code expired`)
        }

        await this.profileService.createProfile({ name: user.userName}, user)
        return await this.userService.update(user.id, { isVerified: true, verificationCode: null, verificationCodeExpiresAt: null })
    }

    private generateResetPasswordToken(userId: string): string {
        return this.jwtService.sign({ userId }, { expiresIn: '1h' })
    }

    private generateVerificationCode(): string {
        const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const codeLength = 6;
        return customAlphabet(alphabet, codeLength)();
    }

    private generateVerificationCodeExpiration(): Date {
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        return expiration;
    }
}
