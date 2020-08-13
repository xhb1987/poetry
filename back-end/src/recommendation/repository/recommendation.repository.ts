import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { RecommendationPoetry } from '../entity/recommendation.entity';

@EntityRepository(RecommendationPoetry)
class RecommendationRepository extends Repository<RecommendationPoetry> {
    async findById(
        id: string | number
    ): Promise<RecommendationPoetry | undefined> {
        return this.findOne(id);
    }

    async updateRecommendationPoet(
        recommendationPoet: RecommendationPoetry
    ): Promise<UpdateResult> {
        return await this.update(
            { id: recommendationPoet.id },
            recommendationPoet
        );
    }

    async createAndSave(
        recommendationPoet: RecommendationPoetry
    ): Promise<RecommendationPoetry> {
        return this.save(recommendationPoet);
    }
}

export default RecommendationRepository;
