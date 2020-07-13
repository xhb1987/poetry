import { Injectable } from '@nestjs/common';
import UserService from '../../user/service/user-service';
import { User } from '../../user/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserDto } from '../../user/dto/user.dto';
import RoleService from '../../user/service/role-services';
import ProfileService from '../../profile/service/profile.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private roleService: RoleService,
        private profileService: ProfileService,
        private jwtService: JwtService
    ) {}

    async validateUser(
        username: string,
        password: string
    ): Promise<User | undefined> {
        const user = await this.userService.findUserByName(username);
        if (!user) {
            return undefined;
        }

        const compareResult = await compare(password, user.password);

        if (compareResult) {
            return user;
        }

        return undefined;
    }

    async login(username: string) {
        const user = await this.userService.findUserByName(username);

        if (!user) {
            throw new Error('Not found user');
        }

        const roles = user.roles.map((role) => role.name);
        const { collections, favorite, username: name } = user;

        const userPayload = {
            username: name,
            collections,
            favorite,
            roles,
        };

        return {
            access_token: this.jwtService.sign(userPayload),
            user: userPayload,
        };
    }

    async register(userDto: UserDto, role?: string) {
        const existingUser = await this.userService.findUserByName(
            userDto.username
        );
        if (existingUser) {
            throw new Error('User already exist');
        }

        const userRole = await this.roleService.findRoleByName(role || 'USER');
        const userFavorite = await this.profileService.saveFavorite();
        if (!userRole) {
            throw new Error('cannot find a role');
        }
        const newUser = await this.userService.register(
            userDto,
            userRole,
            [],
            userFavorite
        );

        return this.login(newUser.username);
    }

    async logout() {
        return undefined;
    }
}
