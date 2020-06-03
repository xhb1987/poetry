import { Controller, Post, Get, Param, UseGuards } from "@nestjs/common";
import ProfileService from "../service/profile.service";
import UserService from "../../user/service/user-service";
import { Profile } from "../entity/profile.entity";
import { CurrentUser } from "../../common/decorator/current.user.decorator";
import { User } from "../../user/entity/user.entity";
import { JwtAuthGuard } from "../../common/guard/jwt-auth.guard";
import { RolesGuard } from "../../common/guard/roles.guard";
import { Roles } from "../../common/decorator/roles.decorator";

@Controller("/profile")
export class ProfileController {
  constructor(
    private profileService: ProfileService,
    private userService: UserService
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("USER")
  @Get("/detail/")
  async getProfile(@CurrentUser() user: User): Promise<Profile | undefined> {
    return this.profileService.findProfileById(user.profile.id);
  }
}
