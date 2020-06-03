import UserService from "../service/user-service";
import { Inject } from "typedi";
import generateResponseMessage from "../../common/response-messge/response-message";
import { Message, ResponseMessage } from "../../common/response-messge/types";

import { hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { Controller, Get, Param, Post, Body, UseGuards } from "@nestjs/common";
import { Logger } from "../../common/logging/logging";
import { UserDto } from "../dto/user.dto";
import RoleService from "../service/role-services";
import { User } from "../entity/user.entity";
import { JwtAuthGuard } from "../../common/guard/jwt-auth.guard";
import { Roles } from "../../common/decorator/roles.decorator";
import { RolesGuard } from "../../common/guard/roles.guard";
import ProfileService from "../../profile/service/profile.service";
import { Profile } from "../../profile/entity/profile.entity";

@Controller("user")
class UserController {
  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private profileService: ProfileService,
    private logger: Logger
  ) {}

  @Get("/all")
  async getAllUser(): Promise<ResponseMessage<string[]>> {
    const users = await this.userService.find();
    const userNames = users.length > 0 ? users.map((user) => user.name) : [];
    const responseMessage = generateResponseMessage<string[]>(userNames);
    return responseMessage;
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Get("/detail/:name")
  async getUserByName(
    @Param("name") name: string
  ): Promise<ResponseMessage<string | undefined>> {
    const user = await this.userService.findUserByName(name);
    const userNames = user?.name;
    const responseMessage = generateResponseMessage<string | undefined>(
      userNames
    );
    return responseMessage;
  }

  @Post("/register")
  async register(
    @Body() user: UserDto,
    role?: string
  ): Promise<ResponseMessage<User | string>> {
    try {
      const existingUser = await this.userService.findUserByName(user.username);
      if (existingUser) {
        const responseMessage = generateResponseMessage<string>(
          "user already existing",
          200,
          Message.Error
        );
        return responseMessage;
      }

      const userRole = await this.roleService.findRoleByName(role || "USER");
      const userProfile = await this.profileService.save({
        name: user.username,
      });
      if (!userRole) {
        const responseMessage = generateResponseMessage<string>(
          "cannot find a role",
          200,
          Message.Error
        );
        return responseMessage;
      }

      return this.userService
        .register(user, userRole, userProfile)
        .then((res) => {
          return generateResponseMessage<string>(user.username);
        });
    } catch (e) {
      return generateResponseMessage<string>("error");
    }
  }
  // // @Post("/login")
  // // async userLogin(@Body() user: IUser): Promise<ResponseMessage<string>> {
  // //   try {
  // //     if (!user.name || !user.password) {
  // //       throw new Error("pleaser enter username or password");
  // //     }
  // //     const users = await this.userRepository.findUserByName(user.name);
  // //     if (users.length != 1 && users.length > 0) {
  // //       throw new Error("find more than one user with same name");
  // //     }
  // //     if (users === undefined || users === null || users.length === 0) {
  // //       throw new Error("cannot find this user");
  // //     }
  // //     const foundUser = await users.pop()?.populate("role").execPopulate();
  // //     return compare(user.password, foundUser?.password || "").then((res) => {
  // //       const jwtToken = sign(
  // //         { name: foundUser?.name, role: foundUser?.role.map((rl) => rl.name) },
  // //         process.env.SECRET,
  // //         {
  // //           expiresIn: "1 day",
  // //         }
  // //       );
  // //       return res
  // //         ? generateResponseMessage<string>(jwtToken)
  // //         : generateResponseMessage<string>("wrong password");
  // //     });
  // //   } catch (e) {
  // //     return generateResponseMessage<string>(`login failed: ${e.message}`);
  // //   }
  // // }
  // // @Post("/token")
  // // @Authorized()
  // // async tokenRenew(
  // //   @CurrentUser({ required: true }) user: IUserModel
  // // ): Promise<ResponseMessage<string | object>> {
  // //   try {
  // //     const newToken = sign(
  // //       { name: user.name, role: user.role },
  // //       process.env.SECRET,
  // //       {
  // //         expiresIn: "1 day",
  // //       }
  // //     );
  // //     return generateResponseMessage<string>(newToken);
  // //   } catch (e) {
  // //     return generateResponseMessage<string>(`invalid token: ${e.message}`);
  // //   }
  // // }
}
export default UserController;
