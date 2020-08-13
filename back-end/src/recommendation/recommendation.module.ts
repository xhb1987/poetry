import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { LoggerModule } from '../common/logging/logging.module';
import PoetryRepository from '../poetry/repository/poetry.repository';
import RoleRepository from '../user/repository/role.repository';
import UserRepository from '../user/repository/user.repository';
import RoleService from '../user/service/role-services';
import UserService from '../user/service/user-service';
import RecommendationController from './controller/recommendation.controller';
import RecommendationRepository from './repository/recommendation.repository';
import RecommendationPoetryService from './service/recommendation.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserRepository,
            RoleRepository,
            RecommendationRepository,
            PoetryRepository,
        ]),
        LoggerModule,
        ConfigModule,
    ],
    controllers: [RecommendationController],
    providers: [
        UserService,
        RoleService,
        JwtStrategy,
        RecommendationPoetryService,
    ],
})
export class RecommendationModule {}
