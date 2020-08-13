import { EntityRepository, Repository } from 'typeorm';
import { Poetry } from '../entity/poetry.entity';

@EntityRepository(Poetry)
class PoetryRepository extends Repository<Poetry> {
    async findPoetryByTitleOrParagraphs(
        content: string
    ): Promise<Poetry[] | undefined> {
        return this.createQueryBuilder()
            .select()
            .where(`title like '%${content}%'`)
            .orWhere(`paragraphs like '%${content}%'`)
            .getMany();
    }

    async findPoetryByAuthor(author: string): Promise<Poetry[] | undefined> {
        return this.createQueryBuilder()
            .select()
            .where(`author like '%${author}%'`)
            .getMany();
    }

    async findPoetryById(id: number): Promise<Poetry | undefined> {
        return this.findOne(id);
    }
}

export default PoetryRepository;
