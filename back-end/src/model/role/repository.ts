import Repository from "../repository/base-repository";

import { Service } from "typedi";
import { IRoleModel } from "./types";
import { RoleModel } from "./schema";

@Service()
class RoleRepository extends Repository<IRoleModel> {
  constructor() {
    super(RoleModel);
  }
  findById(id: string) {
    return super.findById(id);
  }
  findByName(name: string) {
    return super.findByName(name);
  }
}

export default RoleRepository;
