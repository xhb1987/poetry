import { Service } from "typedi";
import UserRepository from "../repository/user.repository";

import { Injectable } from "@nestjs/common";
import { Logger } from "../../common/logging/logging";
import { hash } from "bcrypt";
import { UserDto } from "../dto/user.dto";
import RoleRepository from "../repository/role.repository";
import { RoleDto } from "../dto/rols.dto";
import { User } from "../entity/user.entity";
import { Role } from "../entity/role.entity";
import { Profile } from "../../profile/entity/profile.entity";

@Injectable()
class UserService {
  constructor(private userRepository: UserRepository, private logger: Logger) {}

  public async findUserById(id: string): Promise<User[]> {
    return this.userRepository.findById(id);
  }

  public async encryptPassword(password: string): Promise<string> {
    const encryptedPassword = await hash(password, 10);
    return encryptedPassword;
  }

  public async register(
    user: UserDto,
    role: Role,
    profile: Profile
  ): Promise<User> {
    const encryptedPassword = await this.encryptPassword(user.password);
    const newUserModel = new User();
    newUserModel.name = user.username;
    newUserModel.password = encryptedPassword;
    newUserModel.roles = [role];
    newUserModel.profile = profile;
    return this.userRepository.createAndSave(newUserModel);
  }

  public async find(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async findUserByName(name: string): Promise<User | undefined> {
    return this.userRepository.findByName(name);
  }
}

export default UserService;
