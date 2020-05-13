import { Service } from "typedi";
import UserRepository from "../../model/user/repository";
import { IUserModel } from "../../model/user/types";
import RoleRepository from "../../model/role/repository";
import { IRoleModel } from "../../model/role/types";

@Service()
class UserService {
  private userRepository: UserRepository = new UserRepository();
  private roleRepository: RoleRepository = new RoleRepository();

  public async findRoleByName(name: string): Promise<IRoleModel[]> {
    return this.roleRepository.findByName(name);
  }

  public async findUserById(id: string): Promise<IUserModel> {
    return this.userRepository.findById(id);
  }

  public async register(
    user: IUserModel,
    callback?: (err: any, res: IUserModel) => void
  ): Promise<IUserModel> {
    return this.userRepository.save(user, callback);
  }

  public async find(): Promise<IUserModel[]> {
    return this.userRepository.find();
  }

  public async findUserByName(name: string): Promise<IUserModel[]> {
    return this.userRepository.findByName(name);
  }
}

export default UserService;
