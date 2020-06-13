import { Injectable } from "@nestjs/common";
import UserService from "../../user/service/user-service";
import { User } from "../../user/entity/user.entity";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { UserDto } from "../../user/dto/user.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
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

  async login(userDto: UserDto) {
    const user = await this.userService.findUserByName(userDto.username);
    if (!user) {
      throw new Error("Not found user");
    }
    const roles = user.roles.map((role) => role.name);
    const profile = user.profile;
    const payload = {
      username: userDto.username,
      profile,
      roles,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout() {
    return undefined;
  }
}
