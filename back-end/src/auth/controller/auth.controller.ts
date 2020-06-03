import {
  Controller,
  Post,
  UseGuards,
  Body,
  Request,
  Get,
  Req,
} from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { AuthGuard } from "@nestjs/passport";
import { UserDto } from "../../user/dto/user.dto";
import { ResponseMessage } from "../../common/response-messge/types";
import { compare } from "bcrypt";
import { LocalAuthGuard } from "../../common/guard/local-auth.guard";
import { JwtAuthGuard } from "../../common/guard/jwt-auth.guard";
import { Roles } from "../../common/decorator/roles.decorator";
import { RolesGuard } from "../../common/guard/roles.guard";
import { CurrentUser } from "../../common/decorator/current.user.decorator";
import { User } from "../../user/entity/user.entity";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(@Body() user: UserDto) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post("/logout")
  async logout() {
    // TODO black list current token
    return this.authService.logout();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("USER")
  @Get("/test")
  async getTest(@Request() req: any, @CurrentUser() user: User) {
    return req.user;
  }
}
