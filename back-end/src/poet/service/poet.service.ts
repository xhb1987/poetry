import { Injectable } from '@nestjs/common';
import { Logger } from '../../common/logging/logging';
import PoetRepository from '../repository/poet.repository';
import { Poet } from '../entity/poet.entity';
import { CollectionDto } from '../../profile/dto/collection.dto';
import { Collection } from '../../profile/entity/collection.entity';
import UserRepository from '../../user/repository/user.repository';
import { User } from '../../user/entity/user.entity';

@Injectable()
class PoetService {
    constructor(
        private poetRepository: PoetRepository,
        private userRepository: UserRepository,
        private logger: Logger
    ) {}

    public async findPoetByTitleOrParagraphs(
        content: string
    ): Promise<Poet[] | undefined> {
        console.log('content => ', content);
        return this.poetRepository.findPoetByTitleOrParagraphs(content);
    }

    public async findPoetByAuthor(author: string): Promise<Poet[] | undefined> {
        return this.poetRepository.findPoetByAuthor(author);
    }

    public async findPoetById(id: number): Promise<Poet | undefined> {
        return this.poetRepository.findOne(id);
    }
}

export default PoetService;
