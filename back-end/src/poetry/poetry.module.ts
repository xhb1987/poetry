import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../common/logging/logging.module';
import UserService from '../user/service/user-service';
import UserRepository from '../user/repository/user.repository';
import { UserModule } from '../user/user.module';
import { PoetryController } from './controller/poetry.controller';
import ProfileService from '../profile/service/profile.service';
import PoetryService from './service/poetry.service';
import PoetryRepository from './repository/poetry.repository';
import { CollectionRepository } from '../profile/repository/collection.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CollectionRepository,
            UserRepository,
            PoetryRepository,
        ]),
        LoggerModule,
        UserModule,
    ],
    controllers: [PoetryController],
    providers: [ProfileService, UserService, PoetryService],
})
export class PoetryModule {}
