import { EntityRepository, Repository } from "typeorm";
import { Role } from "../entity/role.entity";
import { RoleDto } from "../dto/rols.dto";

@EntityRepository(Role)
class RoleRepository extends Repository<Role> {
  async findByName(name: string): Promise<Role | undefined> {
    return this.findOne({ name });
  }
}

export default RoleRepository;
