import { EntityRepository, Repository } from 'typeorm';
import { Favorite } from '../entity/favorite.entity';

@EntityRepository(Favorite)
export class FavoriteRepository extends Repository<Favorite> {
    async findById(id: number): Promise<Favorite | undefined> {
        return this.findOne(id, {
            relations: ['user', 'poets'],
            where: { id },
        });
    }

    async createAndSave(favorite: Favorite): Promise<Favorite> {
        return this.save(favorite);
    }
}
