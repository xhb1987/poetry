import {
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Body,
  BadRequestException,
} from "@nestjs/common";
import ProfileService from "../service/profile.service";
import UserService from "../../user/service/user-service";
import { Profile } from "../entity/profile.entity";
import { CurrentUser } from "../../common/decorator/current.user.decorator";
import { User } from "../../user/entity/user.entity";
import { JwtAuthGuard } from "../../common/guard/jwt-auth.guard";
import { RolesGuard } from "../../common/guard/roles.guard";
import { Roles } from "../../common/decorator/roles.decorator";
import { Poet } from "../../poet/entity/poet.entity";
import { ResponseMessage } from "../../common/response-messge/types";
import { PoetDto } from "../../poet/dto/poet.dto";
import PoetService from "../../poet/service/poet.service";
import generateResponseMessage from "../../common/response-messge/response-message";

@Controller("/profile")
export class ProfileController {
  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private poetService: PoetService
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("USER")
  @Get("/detail/")
  async getProfile(@CurrentUser() user: User): Promise<Profile | undefined> {
    return this.profileService.findProfileById(user.profile.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("USER")
  @Post("/favorite")
  async addPoetToFavorite(
    @Body() poet: PoetDto,
    @CurrentUser() user: User
  ): Promise<ResponseMessage<Profile>> {
    const poetEntity = await this.poetService.findPoetById(poet.id);
    if (poetEntity === undefined) {
      throw new BadRequestException("cannot find this poet");
    }

    const profile = await this.profileService.updateProfileFavorites(
      user.profile.id,
      poetEntity
    );

    return generateResponseMessage(profile);
  }
}
