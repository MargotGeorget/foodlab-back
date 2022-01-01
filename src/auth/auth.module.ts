import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./strategies/local.strategy";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./constants";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {AuthController} from "./auth.controller";
import {UserModule} from "../user/user.module";
import {AdminStrategy} from "./strategies/admin.strategy";

@Module({
  imports: [
    UserModule,
    PassportModule,
      JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '3600s' }
      })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, AdminStrategy], //AdminStrategy
  exports: [AuthService]
})
export class AuthModule {}
