import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class VerifyEmailDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, 6)
    verificationCode: string;
}

// @IsNotEmpty({ message: 'Verification code is required' })
// @IsString({ message: 'Verification code must be a string' })
// @Length(6, 6, { message: 'Verification code must be exactly 6 characters long' })