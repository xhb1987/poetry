import { Injectable } from "@nestjs/common";
import RoleRepository from "../repository/role.repository";
import { Logger } from "../../common/logging/logging";
import { RoleDto } from "../dto/rols.dto";
import { Role } from "../entity/role.entity";

@Injectable()
class RoleService {
  constructor(private roleRepository: RoleRepository, private logger: Logger) {}

  public async findRoleByName(name: string): Promise<Role | undefined> {
    return this.roleRepository.findByName(name);
  }
}

export default RoleService;
