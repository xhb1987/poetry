import Repository from "../repository/base-repository";
import { IUserModel } from "./types";
import { Service } from "typedi";
import { UserModel } from "./schema";

@Service()
class UserRepository extends Repository<IUserModel> {
  constructor() {
    super(UserModel);
  }
  async findById(id: string): Promise<IUserModel> {
    console.log(id);
    return super.findById(id);
  }
  async find(): Promise<IUserModel[]> {
    return super.find();
  }
  async findByName(name: string): Promise<IUserModel[]> {
    return super.findByName(name);
  }

  async save(
    user: IUserModel,
    callback?: (err: any, res: IUserModel) => void
  ): Promise<IUserModel> {
    return super.save(user, callback);
  }

  async create(
    user: IUserModel,
    callback?: (err: any, res: IUserModel) => void
  ): Promise<IUserModel> {
    return super.create(user, callback);
  }
}

export default UserRepository;
