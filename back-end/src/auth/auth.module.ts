import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import UserService from '../user/service/user-service';
import { LoggerModule } from '../common/logging/logging.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserRepository from '../user/repository/user.repository';
import RoleRepository from '../user/repository/role.repository';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import RoleService from '../user/service/role-services';
import ProfileService from '../profile/service/profile.service';
import { CollectionRepository } from '../profile/repository/collection.repository';
import PoetRepository from '../poetry/repository/poetry.repository';

@Module({
    imports: [
        ConfigModule.forRoot({ load: [configuration] }),
        TypeOrmModule.forFeature([
            UserRepository,
            RoleRepository,
            CollectionRepository,
            PoetRepository,
        ]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('secret'),
                signOptions: { expiresIn: '7d' },
            }),
            inject: [ConfigService],
        }),
        UserModule,
        LoggerModule,
        PassportModule,
        ConfigModule,
    ],
    providers: [
        AuthService,
        UserService,
        RoleService,
        ProfileService,
        LocalStrategy,
        JwtStrategy,
    ],
    controllers: [AuthController],
})
export class AuthModule {}
