import { Injectable } from '@nestjs/common';
import { UsersService } from './user.service';
import { BadRequestError, NotFoundError, AUTH_ERRORS } from 'src/common/exceptions';

import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { EmailService } from 'src/modules/email/email.service';
import { JwtService } from "@nestjs/jwt"
import { customAlphabet } from 'nanoid';
import { ProfileService } from 'src/modules/profile/profile.service';


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
            throw new BadRequestError(AUTH_ERRORS.PREFIX.BUSINESS, AUTH_ERRORS.NUMBER.EMAIL_ALREADY_EXISTS, 'auth.email_already_exists');
        }

        // check if user userName is unique
        const userByName = await this.userService.find(null, userName);
        if (userByName.length) {
            throw new BadRequestError(AUTH_ERRORS.PREFIX.BUSINESS, AUTH_ERRORS.NUMBER.USERNAME_ALREADY_EXISTS, 'auth.username_already_exists')
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
            throw new NotFoundError(AUTH_ERRORS.PREFIX.BUSINESS, AUTH_ERRORS.NUMBER.USER_NOT_FOUND_LOGIN, 'auth.user_not_found')
        }

        const verifiedUser = await bcrypt.compare(userCredentials.password, user[0].password)

        if (!verifiedUser) {
            throw new BadRequestError(AUTH_ERRORS.PREFIX.BUSINESS, AUTH_ERRORS.NUMBER.INCORRECT_PASSWORD, 'auth.incorrect_password')
        }

        return user[0];
    }

    async sendResetPasswordEmail(userData: any) {
        const [user] = await this.userService.find(userData.email, userData.userName);

        if (!user) {
            throw new NotFoundError(AUTH_ERRORS.PREFIX.BUSINESS, AUTH_ERRORS.NUMBER.USER_NOT_FOUND_RESET, 'auth.user_not_found')
        }

        const token = this.generateResetPasswordToken(user.id)
        const resetPasswordUrl = process.env.HOW_URL || `${process.env.HOST}:${process.env.PORT}/auth/reset-password/${token}`

        await this.emailService.sendResetPasswordEmail(user.email, resetPasswordUrl);
    }

    async resetPassword(token: string, password: string) {
        const { userId } = await this.jwtService.decode(token) as { userId: string };

        if (!userId) {
            throw new BadRequestError(AUTH_ERRORS.PREFIX.BUSINESS, AUTH_ERRORS.NUMBER.INVALID_RESET_TOKEN, 'auth.invalid_reset_token');
        }

        const salt = await bcrypt.genSalt()
        password = await bcrypt.hash(password, salt);
        return await this.userService.update(userId, { password })
    }

    async verifyEmail(email: string, verificationCode: string) {
        const [user] = await this.userService.find(email);

        if (!user) {
            throw new NotFoundError(AUTH_ERRORS.PREFIX.BUSINESS, AUTH_ERRORS.NUMBER.USER_NOT_FOUND_VERIFY, 'auth.user_not_found')
        }

        if (user.isVerified) {
            throw new BadRequestError(AUTH_ERRORS.PREFIX.BUSINESS, AUTH_ERRORS.NUMBER.USER_ALREADY_VERIFIED, 'auth.user_already_verified')
        }

        if (user.verificationCode !== verificationCode) {
            throw new BadRequestError(AUTH_ERRORS.PREFIX.BUSINESS, AUTH_ERRORS.NUMBER.INVALID_VERIFICATION_CODE, 'auth.invalid_verification_code')
        }

        if (user.verificationCodeExpiresAt < new Date()) {
            throw new BadRequestError(AUTH_ERRORS.PREFIX.BUSINESS, AUTH_ERRORS.NUMBER.VERIFICATION_CODE_EXPIRED, 'auth.verification_code_expired')
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
