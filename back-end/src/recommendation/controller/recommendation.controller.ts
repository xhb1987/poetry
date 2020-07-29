import { Inject } from 'typedi';
import generateResponseMessage from '../../common/response-messge/response-message';
import { Message, ResponseMessage } from '../../common/response-messge/types';

import { hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    UseGuards,
    Put,
} from '@nestjs/common';
import { Logger } from '../../common/logging/logging';

import { JwtAuthGuard } from '../../common/guard/jwt-auth.guard';
import { Roles } from '../../common/decorator/roles.decorator';
import { RolesGuard } from '../../common/guard/roles.guard';
import ProfileService from '../../profile/service/profile.service';
import RecommendationPoetService from '../service/recommendation.service';
import { RecommendationPoet } from '../entity/recommendation.entity';
import { UpdateResult } from 'typeorm';

@Controller('recommendation')
class RecommendationController {
    constructor(
        private recommendationPoetService: RecommendationPoetService,
        private logger: Logger
    ) {}

    @Get('/all')
    async getRecommendationPoet(): Promise<
        ResponseMessage<RecommendationPoet[] | undefined>
    > {
        const recommendationPoets = await this.recommendationPoetService.findAllRecommendationPoet();

        const responseMessage = generateResponseMessage<
            RecommendationPoet[] | undefined
        >(recommendationPoets);
        return responseMessage;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Post('/create')
    async createRecommendationPoet(
        @Body() data: { name: string }
    ): Promise<ResponseMessage<RecommendationPoet>> {
        const { name } = data;
        const recommendationPoet = await this.recommendationPoetService.createAndSave(
            name
        );

        const responseMessage = generateResponseMessage<RecommendationPoet>(
            recommendationPoet
        );
        return responseMessage;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Put('/add/:recommendationId/poet/:poetId')
    async addRecommendationPoet(
        @Param('recommendationId') recommendationId: number,
        @Param('poetId') poetId: number
    ): Promise<ResponseMessage<UpdateResult>> {
        // console.log(recommendationId);
        const recommendationPoet = await this.recommendationPoetService.addPoetToRecommendation(
            recommendationId,
            poetId
        );

        const responseMessage = generateResponseMessage<UpdateResult>(
            recommendationPoet
        );
        return responseMessage;
    }
}
export default RecommendationController;
