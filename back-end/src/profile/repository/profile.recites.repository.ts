import { EntityRepository, Repository } from 'typeorm';
import { ProfileRecites } from '../entity/profile.recites.entity';

@EntityRepository(ProfileRecites)
export class ProfileRecitesRepository extends Repository<ProfileRecites> {
    async findById(id: number): Promise<ProfileRecites | undefined> {
        return this.findOne(id, {
            relations: ['profile', 'poet'],
            where: { id },
        });
    }

    async createAndSave(profile: ProfileRecites): Promise<ProfileRecites> {
        return this.save(profile);
    }
}
