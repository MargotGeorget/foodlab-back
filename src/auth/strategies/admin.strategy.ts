import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {jwtConstants} from "../constants";
import {UserService} from "../../user/user.service";
import {User} from "../../user/entities/user.entity";

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, 'admin') {

    constructor(
        private userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret // TODO look at PEM-encoded public key technology
        });
    }

    async validate(payload: any) {
        const userId: number = payload.sub;
        const user: User = await this.userService.findOneById(userId);
        if (user.isAdmin === true) {
            return { id: userId }
        }
        throw new UnauthorizedException();
    }
}