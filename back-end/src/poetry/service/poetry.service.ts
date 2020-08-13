import { Injectable } from '@nestjs/common';
import { Logger } from '../../common/logging/logging';
import PoetRepository from '../repository/poetry.repository';
import { Poetry } from '../entity/poetry.entity';
import UserRepository from '../../user/repository/user.repository';

@Injectable()
class PoetryService {
    constructor(
        private poetRepository: PoetRepository,
        private userRepository: UserRepository,
        private logger: Logger
    ) {}

    public async findPoetByTitleOrParagraphs(
        content: string
    ): Promise<Poetry[] | undefined> {
        console.log('content => ', content);
        return this.poetRepository.findPoetryByTitleOrParagraphs(content);
    }

    public async findPoetByAuthor(
        author: string
    ): Promise<Poetry[] | undefined> {
        return this.poetRepository.findPoetryByAuthor(author);
    }

    public async findPoetById(id: number): Promise<Poetry | undefined> {
        return this.poetRepository.findOne(id);
    }
}

export default PoetryService;
