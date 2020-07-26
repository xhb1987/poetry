import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { Collection } from '../entity/collection.entity';

@EntityRepository(Collection)
export class CollectionRepository extends Repository<Collection> {
    async findById(id: number): Promise<Collection | undefined> {
        return this.findOne(id, {
            relations: ['poets'],
            where: { id },
            withDeleted: false,
        });
    }

    async createAndSave(collection: Collection): Promise<Collection> {
        return this.save(collection);
    }

    async deleteById(id: number): Promise<DeleteResult> {
        return this.softDelete({ id });
    }
}
