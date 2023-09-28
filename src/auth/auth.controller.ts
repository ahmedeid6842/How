import { Body, Controller, Param, Post, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';

@Serialize(UserDto)
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/register')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.register(body.email, body.userName, body.password);

        session.userId = user.id

        return user;
    }

    @Post('/login')
    async login(@Body() body: LoginUserDto, @Session() session: any) {
        const user = await this.authService.login(body);

        session.userId = user.id;

        return user
    }

    @Post('/reset-password')
    async askResetPassword(@Body() body: any) {
        await this.authService.sendResetPasswordEmail(body)
    }

    @Post('/reset-password/:token')
    async resetPassword(@Param('token') token: string, @Body('password') password: string) {
        const user = await this.authService.resetPassword(token, password)
        return user;
    }
}
