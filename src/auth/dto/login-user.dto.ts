import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class LoginUserDto {
    //using validateIf to make sure that at lease the userName or the email should be provided
    @ValidateIf(user => user.email == null || (user.email != null && user.userName != null))
    @IsString()
    @IsNotEmpty()
    userName?: string;

    @ValidateIf(user => user.userName == null || (user.email != null && user.userName != null))
    @IsEmail()
    email?: string;

    @IsNotEmpty()
    @IsString()
    password: string;

}