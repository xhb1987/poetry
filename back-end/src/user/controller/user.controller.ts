import UserService from '../service/user-service';
import { Inject } from 'typedi';
import generateResponseMessage from '../../common/response-messge/response-message';
import { Message, ResponseMessage } from '../../common/response-messge/types';

import { hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { Logger } from '../../common/logging/logging';
import { UserDto } from '../dto/user.dto';
import RoleService from '../service/role-services';
import { User } from '../entity/user.entity';
import { JwtAuthGuard } from '../../common/guard/jwt-auth.guard';
import { Roles } from '../../common/decorator/roles.decorator';
import { RolesGuard } from '../../common/guard/roles.guard';
import ProfileService from '../../profile/service/profile.service';

@Controller('user')
class UserController {
    constructor(
        private userService: UserService,
        private roleService: RoleService,
        private profileService: ProfileService,
        private logger: Logger
    ) {}

    @Get('/all')
    async getAllUser(): Promise<ResponseMessage<string[]>> {
        const users = await this.userService.find();
        const userNames =
            users.length > 0 ? users.map((user) => user.username) : [];
        const responseMessage = generateResponseMessage<string[]>(userNames);
        return responseMessage;
    }

    @UseGuards(JwtAuthGuard)
    @UseGuards(RolesGuard)
    @Get('/detail/:name')
    async getUserByName(
        @Param('name') name: string
    ): Promise<ResponseMessage<string | undefined>> {
        const user = await this.userService.findUserByName(name);
        const userNames = user?.username;
        const responseMessage = generateResponseMessage<string | undefined>(
            userNames
        );
        return responseMessage;
    }
}
export default UserController;
