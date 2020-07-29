import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { RecommendationPoet } from '../entity/recommendation.entity';

@EntityRepository(RecommendationPoet)
class RecommendationRepository extends Repository<RecommendationPoet> {
    async findById(
        id: string | number
    ): Promise<RecommendationPoet | undefined> {
        return this.findOne(id);
    }

    async updateRecommendationPoet(
        recommendationPoet: RecommendationPoet
    ): Promise<UpdateResult> {
        return await this.update(
            { id: recommendationPoet.id },
            recommendationPoet
        );
    }

    async createAndSave(
        recommendationPoet: RecommendationPoet
    ): Promise<RecommendationPoet> {
        return this.save(recommendationPoet);
    }
}

export default RecommendationRepository;
