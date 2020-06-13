import { EntityRepository, Repository } from "typeorm";
import { Profile } from "../entity/profile.entity";

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
  async findById(id: number): Promise<Profile | undefined> {
    return this.findOne(id, {
      relations: ["favorites", "recites", "finished"],
      where: { id },
    });
  }

  async createAndSave(profile: Profile): Promise<Profile> {
    return this.save(profile);
  }
}
