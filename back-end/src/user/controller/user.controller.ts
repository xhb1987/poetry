import UserService from '../service/user-service';
import generateResponseMessage from '../../common/response-messge/response-message';
import { ResponseMessage } from '../../common/response-messge/types';

import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Logger } from '../../common/logging/logging';
import RoleService from '../service/role-services';
import { JwtAuthGuard } from '../../common/guard/jwt-auth.guard';
import { RolesGuard } from '../../common/guard/roles.guard';
import ProfileService from '../../profile/service/profile.service';

@Controller('user')
class UserController {
    constructor(private userService: UserService, private logger: Logger) {}

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
