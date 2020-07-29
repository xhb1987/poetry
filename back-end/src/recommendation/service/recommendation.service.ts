import { Injectable } from '@nestjs/common';
import { Logger } from '../../common/logging/logging';
import { hash } from 'bcrypt';

import { Collection } from '../../profile/entity/collection.entity';
import RecommendationRepository from '../repository/recommendation.repository';
import { RecommendationPoet } from '../entity/recommendation.entity';
import { Poet } from '../../poet/entity/poet.entity';
import { UpdateResult } from 'typeorm';
import PoetRepository from '../../poet/repository/poet.repository';

@Injectable()
class RecommendationPoetService {
    constructor(
        private recommendationPoetRepository: RecommendationRepository,
        private poetRepository: PoetRepository,
        private logger: Logger
    ) {}

    public async findRecommendationPoetById(
        id: string | number
    ): Promise<RecommendationPoet | undefined> {
        return this.recommendationPoetRepository.findById(id);
    }

    public async findAllRecommendationPoet(): Promise<
        RecommendationPoet[] | undefined
    > {
        return this.recommendationPoetRepository.find({ relations: ['poet'] });
    }

    public async addPoetToRecommendation(
        recommendationPoetId: number,
        poetId: number
    ): Promise<UpdateResult> {
        const poet = await this.poetRepository.findPoetById(poetId);
        const recommendationPoet = await this.findRecommendationPoetById(
            recommendationPoetId
        );

        if (!poet || !recommendationPoet) {
            throw new Error('cannot find');
        }

        recommendationPoet.poet = poet;

        return this.recommendationPoetRepository.updateRecommendationPoet(
            recommendationPoet
        );
    }

    public async createAndSave(name: string): Promise<RecommendationPoet> {
        const recommendationPoet = new RecommendationPoet();
        recommendationPoet.name = name;

        return this.recommendationPoetRepository.createAndSave(
            recommendationPoet
        );
    }
}

export default RecommendationPoetService;
