import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import UserController from "./controller/user.controller";
import UserService from "./service/user-service";
import { User } from "./entity/user.entity";
import UserRepository from "./repository/user.repository";
import { LoggerModule } from "../common/logging/logging.module";
import RoleService from "./service/role-services";
import RoleRepository from "./repository/role.repository";
import { JwtStrategy } from "../auth/strategy/jwt.strategy";
import { ConfigModule } from "@nestjs/config";
import { ProfileRepository } from "../profile/repository/profile.repository";
import ProfileService from "../profile/service/profile.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      RoleRepository,
      ProfileRepository,
    ]),
    LoggerModule,
    ConfigModule,
  ],
  controllers: [UserController],
  providers: [UserService, RoleService, ProfileService, JwtStrategy],
})
export class UserModule {}
