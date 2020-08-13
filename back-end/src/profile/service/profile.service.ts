import { Injectable } from '@nestjs/common';
import { Logger } from '../../common/logging/logging';
import { User } from '../../user/entity/user.entity';
import { CollectionRepository } from '../repository/collection.repository';
import { Collection } from '../entity/collection.entity';
import { CollectionDto } from '../dto/collection.dto';
import UserRepository from '../../user/repository/user.repository';
import PoetryRepository from '../../poetry/repository/poetry.repository';

@Injectable()
class ProfileService {
    constructor(
        private collectionRepository: CollectionRepository,
        private userRepository: UserRepository,
        private poetryRepository: PoetryRepository,
        private logger: Logger
    ) {}

    public async findCollectionById(
        id: number
    ): Promise<Collection | undefined> {
        return this.collectionRepository.findById(id);
    }

    public async saveCollection(
        collection: CollectionDto
    ): Promise<Collection> {
        const newCollection = new Collection();
        newCollection.name = collection.name;
        newCollection.isFinished = collection.isFinished ?? false;
        newCollection.poetries = [];

        return this.collectionRepository.createAndSave(newCollection);
    }

    public async addNewCollection(collection: CollectionDto, user: User) {
        const newCollection = await this.saveCollection(collection);

        const { collections } = user;
        const newUser = {
            ...user,
            collections: [
                ...(collections.filter((collection) => !collection.deleteAt) ??
                    []),
                newCollection,
            ].filter((v) => !!v),
        };
        return this.userRepository.save(newUser);
    }

    public async addPoetryToCollection(collectionId: number, poetryId: number) {
        const findCollection = await this.collectionRepository.findById(
            collectionId
        );

        if (!findCollection) {
            throw new Error('cannot find this collection');
        }

        const findPoetry = await this.poetryRepository.findPoetryById(poetryId);

        if (!findPoetry) {
            throw new Error('cannot find this poetry');
        }

        // const update = await this.poetRepository.update(findPoet.id, findPoet);

        findCollection.poetries.push(findPoetry);
        return this.collectionRepository.save(findCollection);
    }

    public async deletePoetryFromCollection(
        collectionId: number,
        poetryId: number
    ) {
        const findCollection = await this.collectionRepository.findById(
            collectionId
        );

        if (!findCollection) {
            throw new Error('cannot find this collection');
        }

        const { poetries } = findCollection;
        const findPoetryIndex = poetries.findIndex(
            (poetry) => poetry.id === poetryId
        );
        poetries.splice(findPoetryIndex, 1);

        return await this.collectionRepository.save({
            ...findCollection,
            poetries,
        });
    }

    public async finishCollection(collectionId: number) {
        const findCollection =
            !!collectionId &&
            (await this.collectionRepository.findById(collectionId));

        if (!findCollection) {
            throw new Error('cannot find this collection');
        }

        findCollection.isFinished = true;
        return this.collectionRepository.save(findCollection);
    }

    public async deleteCollections(collectionIds: number[]) {
        try {
            collectionIds.forEach((id) => {
                this.collectionRepository.deleteById(id);
            });
        } catch (e) {
            throw new Error(e);
        }
    }
}

export default ProfileService;
