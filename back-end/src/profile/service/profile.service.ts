import { Injectable, BadRequestException } from '@nestjs/common';
import { Logger } from '../../common/logging/logging';
import { ProfileDto } from '../dto/profile.dto';
import { Poet } from '../../poet/entity/poet.entity';
import { User } from '../../user/entity/user.entity';
import { CollectionRepository } from '../repository/collection.repository';
import { FavoriteRepository } from '../repository/favorite.repository';
import { Collection } from '../entity/collection.entity';
import { CollectionDto } from '../dto/collection.dto';
import { Favorite } from '../entity/favorite.entity';
import UserRepository from '../../user/repository/user.repository';
import PoetRepository from '../../poet/repository/poet.repository';

@Injectable()
class ProfileService {
    constructor(
        private collectionRepository: CollectionRepository,
        private favoriteRepository: FavoriteRepository,
        private userRepository: UserRepository,
        private poetRepository: PoetRepository,
        private logger: Logger
    ) {}

    public async findFavoriteById(id: number): Promise<Favorite | undefined> {
        return this.favoriteRepository.findById(id);
    }

    public async saveFavorite(): Promise<Favorite> {
        const favorite = new Favorite();
        console.log(favorite);
        return this.favoriteRepository.createAndSave(favorite);
    }

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
        newCollection.poets = [];

        return this.collectionRepository.createAndSave(newCollection);
    }

    public async addNewCollection(collection: CollectionDto, user: User) {
        const newCollection = await this.saveCollection(collection);

        const { collections } = user;
        const newUser = {
            ...user,
            collections: [...(collections ?? []), newCollection].filter(
                (v) => !!v
            ),
        };
        return this.userRepository.save(newUser);
    }

    public async updateCollection(collectionId: number, poetId: number) {
        const findCollection =
            !!collectionId &&
            (await this.collectionRepository.findById(collectionId));

        if (!findCollection) {
            throw new Error('cannot find this collection');
        }

        const findPoet =
            !!poetId && (await this.poetRepository.findPoetById(poetId));

        if (!findPoet) {
            throw new Error('cannot find this poet');
        }

        // const update = await this.poetRepository.update(findPoet.id, findPoet);

        findCollection.poets.push(findPoet);
        return this.collectionRepository.save(findCollection);
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

    // public async findProfileById(id: number): Promise<Profile | undefined> {
    //     return this.profileRepository.findById(id);
    // }

    // public async save(profile: ProfileDto): Promise<Profile> {
    //     const newProfile = new Profile();
    //     const newProfileRecites = new ProfileRecites();

    //     newProfile.name = profile.name;
    //     newProfile.recites = [newProfileRecites];
    //     return this.profileRepository.createAndSave(newProfile);
    // }

    // public async updateProfileFavorites(
    //     profileId: number,
    //     poet: Poet
    // ): Promise<Profile> {
    //     const profile = await this.findProfileById(profileId);
    //     if (profile === undefined) {
    //         throw new BadRequestException('cannot find this profile');
    //     }

    //     const favorites = profile.favorites || [];
    //     console.log(favorites);
    //     return this.profileRepository.save({
    //         ...profile,
    //         favorites: [...favorites, poet],
    //     });
    // }
}

export default ProfileService;
