import { Service } from 'typedi';
import UserRepository from '../repository/user.repository';

import { Injectable } from '@nestjs/common';
import { Logger } from '../../common/logging/logging';
import { hash } from 'bcrypt';
import { UserDto } from '../dto/user.dto';
import RoleRepository from '../repository/role.repository';
import { RoleDto } from '../dto/rols.dto';
import { User } from '../entity/user.entity';
import { Role } from '../entity/role.entity';
import { CollectionDto } from '../../profile/dto/collection.dto';
import { Collection } from '../../profile/entity/collection.entity';
import { Favorite } from '../../profile/entity/favorite.entity';

@Injectable()
class UserService {
    constructor(
        private userRepository: UserRepository,
        private logger: Logger
    ) {}

    public async findUserById(id: string | number): Promise<User | undefined> {
        return this.userRepository.findById(id);
    }

    public async encryptPassword(password: string): Promise<string> {
        const encryptedPassword = await hash(password, 10);
        return encryptedPassword;
    }

    public async register(
        user: UserDto,
        role: Role,
        collections: Collection[],
        favorite: Favorite
    ): Promise<User> {
        const encryptedPassword = await this.encryptPassword(user.password);
        const newUserModel = new User();
        newUserModel.username = user.username;
        newUserModel.password = encryptedPassword;
        newUserModel.roles = [role];
        newUserModel.collections = collections;
        newUserModel.favorite = favorite;

        return this.userRepository.createAndSave(newUserModel);
    }

    public async find(): Promise<User[]> {
        return this.userRepository.find();
    }

    public async findUserByName(name: string): Promise<User | undefined> {
        return this.userRepository.findByName(name);
    }
}

export default UserService;
