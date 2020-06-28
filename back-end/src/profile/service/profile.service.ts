import { Injectable, BadRequestException } from '@nestjs/common';
import { Logger } from '../../common/logging/logging';
import { ProfileRepository } from '../repository/profile.repository';
import { Profile } from '../entity/profile.entity';
import { ProfileDto } from '../dto/profile.dto';
import { Poet } from '../../poet/entity/poet.entity';
import { User } from '../../user/entity/user.entity';
import { ProfileRecites } from '../entity/profile.recites.entity';

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
        const newProfileRecites = new ProfileRecites();

        newProfile.name = profile.name;
        newProfile.recites = [newProfileRecites];
        return this.profileRepository.createAndSave(newProfile);
    }

    public async updateProfileFavorites(
        profileId: number,
        poet: Poet
    ): Promise<Profile> {
        const profile = await this.findProfileById(profileId);
        if (profile === undefined) {
            throw new BadRequestException('cannot find this profile');
        }

        const favorites = profile.favorites || [];
        console.log(favorites);
        return this.profileRepository.save({
            ...profile,
            favorites: [...favorites, poet],
        });
    }
}

export default ProfileService;
