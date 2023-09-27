import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    async register(email: string, userName: string, password: string) {
        return "User registered";
    }
}
