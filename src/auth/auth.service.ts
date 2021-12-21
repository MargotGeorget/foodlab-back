import { Injectable } from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    // Called in the local strategy to check that the provided credentials are correct
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    // Called in the auth/login route to sign a JWT based on a user that provided correct credentials
    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        // payload is what will be "hidden" inside the jwt
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}