import { Injectable } from "@nestjs/common";
import { Logger } from "../../common/logging/logging";
import { ProfileRepository } from "../repository/profile.repository";
import { Profile } from "../entity/profile.entity";
import { ProfileDto } from "../dto/profile.dto";

@Injectable()
class ProfileService {
  constructor(
    private profileRepository: ProfileRepository,
    private logger: Logger
  ) {}

  public async findProfileById(id: number): Promise<Profile | undefined> {
    return this.profileRepository.findById(id);
  }

  public async save(profile: ProfileDto): Promise<Profile> {
    const newProfile = new Profile();
    newProfile.name = profile.name;
    return this.profileRepository.createAndSave(newProfile);
  }
}

export default ProfileService;
