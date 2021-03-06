import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerModule } from '../common/logging/logging.module';

import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import ProfileService from './service/profile.service';
import UserService from '../user/service/user-service';
import UserRepository from '../user/repository/user.repository';
import { UserModule } from '../user/user.module';
import { ProfileController } from './controller/profile.controller';
import PoetryService from '../poetry/service/poetry.service';
import PoetryRepository from '../poetry/repository/poetry.repository';
import { CollectionRepository } from './repository/collection.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CollectionRepository,
            UserRepository,
            PoetryRepository,
        ]),
        LoggerModule,
        ConfigModule,
        UserModule,
    ],
    controllers: [ProfileController],
    providers: [ProfileService, UserService, PoetryService, JwtStrategy],
})
export class ProfileModule {}
