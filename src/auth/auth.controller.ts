import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/register')
    async createUser(@Body() body: any) {
        const user = await this.authService.register(body.email, body.userName, body.password);

        return user;
    }
}
