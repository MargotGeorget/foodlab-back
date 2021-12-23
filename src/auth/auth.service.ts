import { Injectable } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    // Called in the LocalStrategy by the validate() function
    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findOneByEmail(email);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    // Called in the auth/login route to sign a JWT based on a user that provided correct credentials
    async login(user: any) {
        const payload = { username: user.email, sub: user.id };
        // payload is what will be "hidden" inside the jwt
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}