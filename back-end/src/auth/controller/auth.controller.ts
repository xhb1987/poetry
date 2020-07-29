import {
    Controller,
    Post,
    UseGuards,
    Body,
    Request,
    Get,
    Req,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '../../user/dto/user.dto';
import { ResponseMessage, Message } from '../../common/response-messge/types';
import { compare } from 'bcrypt';
import { LocalAuthGuard } from '../../common/guard/local-auth.guard';
import { JwtAuthGuard } from '../../common/guard/jwt-auth.guard';
import { Roles } from '../../common/decorator/roles.decorator';
import { RolesGuard } from '../../common/guard/roles.guard';
import { CurrentUser } from '../../common/decorator/current.user.decorator';
import { User } from '../../user/entity/user.entity';
import generateResponseMessage from '../../common/response-messge/response-message';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Body() user: UserDto) {
        const userData = await this.authService.login(user.username);
        const responseMessage = generateResponseMessage<{
            access_token: string;
            user: Pick<User, 'username' | 'collections'>;
        }>(userData);
        return responseMessage;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/login/token')
    async loginByToken(@CurrentUser() user: User) {
        if (user) {
            const userData = await this.authService.login(user.username);
            const responseMessage = generateResponseMessage<{
                access_token: string;
                user: Pick<User, 'username' | 'collections'>;
            }>(userData);
            return responseMessage;
        }

        throw new Error('not authenticated');
    }

    @UseGuards(JwtAuthGuard)
    @Post('/logout')
    async logout() {
        // TODO black list current token
        console.log('xx');
        return this.authService.logout();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('USER')
    @Get('/test')
    async getTest(@Request() req: any, @CurrentUser() user: User) {
        return req.user;
    }

    @Post('/register')
    async register(@Body() data: { user: UserDto; role?: string }) {
        const { user, role } = data;
        const userData = await this.authService.register(user, role);

        const responseMessage = generateResponseMessage<{
            access_token: string;
            user: Pick<User, 'username' | 'collections'>;
        }>(userData);

        return responseMessage;
    }
}
