import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../common/logging/logging.module';
import UserService from '../user/service/user-service';
import UserRepository from '../user/repository/user.repository';
import { UserModule } from '../user/user.module';
import { PoetController } from './controller/poet.controller';
import ProfileService from '../profile/service/profile.service';
import PoetService from './service/poet.service';
import PoetRepository from './repository/poet.repository';
import { CollectionRepository } from '../profile/repository/collection.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CollectionRepository,
            UserRepository,
            PoetRepository,
        ]),
        LoggerModule,
        UserModule,
    ],
    controllers: [PoetController],
    providers: [ProfileService, UserService, PoetService],
})
export class PoetModule {}
