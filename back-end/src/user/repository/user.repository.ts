import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/user.entity";

@EntityRepository(User)
class UserRepository extends Repository<User> {
  async findById(id: string): Promise<User[]> {
    return this.findByIds([id]);
  }

  async findByName(name: string): Promise<User | undefined> {
    const user = await this.findOne({ name });
    return this.findOne({
      relations: ["roles", "profile"],
      where: { id: user?.id },
    });
  }

  async createAndSave(user: User): Promise<User> {
    return this.save(user);
  }
}

export default UserRepository;
