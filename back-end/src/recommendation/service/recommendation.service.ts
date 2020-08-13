import { Injectable } from '@nestjs/common';
import { Logger } from '../../common/logging/logging';

import RecommendationRepository from '../repository/recommendation.repository';
import { RecommendationPoetry } from '../entity/recommendation.entity';
import { UpdateResult } from 'typeorm';
import PoetryRepository from '../../poetry/repository/poetry.repository';

@Injectable()
class RecommendationPoetService {
    constructor(
        private recommendationRepository: RecommendationRepository,
        private poetryRepository: PoetryRepository,
        private logger: Logger
    ) {}

    public async findRecommendationPoetById(
        id: string | number
    ): Promise<RecommendationPoetry | undefined> {
        return this.recommendationRepository.findById(id);
    }

    public async findAllRecommendationPoet(): Promise<
        RecommendationPoetry[] | undefined
    > {
        return this.recommendationRepository.find({
            relations: ['poetry'],
        });
    }

    public async addPoetToRecommendation(
        recommendationPoetryId: number,
        poetryId: number
    ): Promise<UpdateResult> {
        const poetry = await this.poetryRepository.findPoetryById(poetryId);
        const recommendationPoetry = await this.findRecommendationPoetById(
            recommendationPoetryId
        );

        if (!poetry || !recommendationPoetry) {
            throw new Error('cannot find');
        }

        recommendationPoetry.poetry = poetry;

        return this.recommendationRepository.updateRecommendationPoet(
            recommendationPoetry
        );
    }

    public async createAndSave(name: string): Promise<RecommendationPoetry> {
        const recommendationPoet = new RecommendationPoetry();
        recommendationPoet.name = name;

        return this.recommendationRepository.createAndSave(recommendationPoet);
    }
}

export default RecommendationPoetService;
