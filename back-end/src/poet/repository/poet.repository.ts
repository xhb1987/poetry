import { EntityRepository, Repository } from "typeorm";
import { Poet } from "../entity/poet.entity";

@EntityRepository(Poet)
class PoetRepository extends Repository<Poet> {
  async findPoetByTitleOrParagraphs(
    content: string
  ): Promise<Poet[] | undefined> {
    return this.createQueryBuilder()
      .select()
      .where(`title like '%${content}%'`)
      .orWhere(`paragraphs like '%${content}%'`)
      .getMany();
  }

  async findPoetByAuthor(author: string): Promise<Poet[] | undefined> {
    return this.createQueryBuilder()
      .select()
      .where(`author like '%${author}%'`)
      .getMany();
  }
}

export default PoetRepository;
