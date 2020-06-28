import { Injectable } from '@nestjs/common';
import { Logger } from '../../common/logging/logging';
import PoetRepository from '../repository/poet.repository';
import { Poet } from '../entity/poet.entity';

@Injectable()
class PoetService {
    constructor(
        private poetRepository: PoetRepository,
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
