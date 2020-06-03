import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { LoggerModule } from "../common/logging/logging.module";

import { JwtStrategy } from "../auth/strategy/jwt.strategy";
import { ConfigModule } from "@nestjs/config";
import { ProfileRepository } from "./repository/profile.repository";
import ProfileService from "./service/profile.service";
import UserService from "../user/service/user-service";
import UserRepository from "../user/repository/user.repository";
import { UserModule } from "../user/user.module";
import { ProfileController } from "./controller/profile.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileRepository, UserRepository]),
    LoggerModule,
    ConfigModule,
    UserModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService, UserService, JwtStrategy],
})
export class ProfileModule {}
