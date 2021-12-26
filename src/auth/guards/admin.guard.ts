import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {UserService} from "../../user/user.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
      private userService: UserService
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    let jwt = undefined;
    const authorization = request.headers.authorization;
    if (authorization) {
      jwt = authorization.substring(7); // removes the "Bearer " part of the authorization header
      //const decodedJwt = this.jwtService.decode(jwt);
    }

    return true;
  }
}
