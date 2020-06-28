import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerModule } from '../common/logging/logging.module';

import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { ProfileRepository } from './repository/profile.repository';
import ProfileService from './service/profile.service';
import UserService from '../user/service/user-service';
import UserRepository from '../user/repository/user.repository';
import { UserModule } from '../user/user.module';
import { ProfileController } from './controller/profile.controller';
import PoetService from '../poet/service/poet.service';
import PoetRepository from '../poet/repository/poet.repository';
import { ProfileRecitesRepository } from './repository/profile.recites.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProfileRepository,
            ProfileRecitesRepository,
            UserRepository,
            PoetRepository,
        ]),
        LoggerModule,
        ConfigModule,
        UserModule,
    ],
    controllers: [ProfileController],
    providers: [ProfileService, UserService, PoetService, JwtStrategy],
})
export class ProfileModule {}
