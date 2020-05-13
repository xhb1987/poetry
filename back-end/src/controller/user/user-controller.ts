import UserService from "../../service/user-service/user-service";
import { Inject } from "typedi";
import { IUser, IUserModel } from "../../model/user/types";
import { IRole } from "../../model/role/types";
import generateResponseMessage from "../../common/response-messge/response-message";
import { Message, ResponseMessage } from "../../common/response-messge/types";
import {
  Get,
  Post,
  Body,
  JsonController,
  Param,
  HeaderParam,
  Authorized,
  CurrentUser,
} from "routing-controllers";
import { UserModel } from "../../model/user/schema";
import { RoleModel } from "../../model/role/schema";
import { hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";

@JsonController("/user")
class UserController {
  @Inject()
  userService!: UserService;

  @Get("/all")
  async getAllUser(): Promise<ResponseMessage<string[]>> {
    const users = await this.userService.find();
    const userNames = users.map((user) => user.name);
    const responseMessage = generateResponseMessage<string[]>(userNames);
    return responseMessage;
  }

  @Get("/:name")
  async getUserByName(
    @Param("name") name: string
  ): Promise<ResponseMessage<string[]>> {
    const users = await this.userService.findUserByName(name);
    const userNames = users.map((user) => user.name);
    const responseMessage = generateResponseMessage<string[]>(userNames);
    return responseMessage;
  }

  @Post("/register")
  async register(
    @Body() user: { user: IUser; role: IRole }
  ): Promise<ResponseMessage<IUser | string>> {
    try {
      const existingUser = await this.userService.findUserByName(
        user.user.name
      );
      if (existingUser.length > 0) {
        const responseMessage = generateResponseMessage<string>(
          "user already existing",
          200,
          Message.Error
        );
        return responseMessage;
      }

      const userRole = await this.userService.findRoleByName("USER");
      console.log(userRole);
      const newRole = user.role?.name
        ? [new RoleModel({ name: user.role.name })]
        : userRole;

      const encryptedPassword = await hash(user.user.password, 10);
      const newUserModel = new UserModel({
        name: user.user.name,
        password: encryptedPassword,
      });

      return this.userService
        .register(newUserModel, async (err, res) => {
          const newUser = await this.userService.findUserById(res._id);
          newUser.role = newRole;
          newUser.save();
        })
        .then((res) => {
          return generateResponseMessage<IUser>({
            name: res.name,
            password: res.password,
            role: res.role,
          });
        });
    } catch (e) {
      return generateResponseMessage<string>("error");
    }
  }

  @Post("/login")
  async userLogin(@Body() user: IUser): Promise<ResponseMessage<string>> {
    try {
      if (!user.name || !user.password) {
        throw new Error("pleaser enter username or password");
      }
      const users = await this.userService.findUserByName(user.name);
      if (users.length != 1 && users.length > 0) {
        throw new Error("find more than one user with same name");
      }

      if (users === undefined || users === null || users.length === 0) {
        throw new Error("cannot find this user");
      }

      const foundUser = await users.pop()?.populate("role").execPopulate();

      return compare(user.password, foundUser?.password || "").then((res) => {
        const jwtToken = sign(
          { name: foundUser?.name, role: foundUser?.role.map((rl) => rl.name) },
          process.env.SECRET,
          {
            expiresIn: "1 day",
          }
        );
        return res
          ? generateResponseMessage<string>(jwtToken)
          : generateResponseMessage<string>("wrong password");
      });
    } catch (e) {
      return generateResponseMessage<string>(`login failed: ${e.message}`);
    }
  }

  @Post("/token")
  @Authorized()
  async tokenRenew(
    @CurrentUser({ required: true }) user: IUserModel
  ): Promise<ResponseMessage<string | object>> {
    try {
      const newToken = sign(
        { name: user.name, role: user.role },
        process.env.SECRET,
        {
          expiresIn: "1 day",
        }
      );
      return generateResponseMessage<string>(newToken);
    } catch (e) {
      return generateResponseMessage<string>(`invalid token: ${e.message}`);
    }
  }
}
export default UserController;
