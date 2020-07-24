import {
    Controller,
    Post,
    Get,
    Param,
    UseGuards,
    Body,
    Patch,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import ProfileService from '../service/profile.service';
import UserService from '../../user/service/user-service';
import { CurrentUser } from '../../common/decorator/current.user.decorator';
import { User } from '../../user/entity/user.entity';
import { JwtAuthGuard } from '../../common/guard/jwt-auth.guard';
import { RolesGuard } from '../../common/guard/roles.guard';
import { Roles } from '../../common/decorator/roles.decorator';
import { Poet } from '../../poet/entity/poet.entity';
import { ResponseMessage } from '../../common/response-messge/types';
import { PoetDto } from '../../poet/dto/poet.dto';
import PoetService from '../../poet/service/poet.service';
import generateResponseMessage from '../../common/response-messge/response-message';
import { Collection } from '../entity/collection.entity';
import { CollectionDto } from '../dto/collection.dto';
import { UpdateResult } from 'typeorm';

@Controller('/profile')
export class ProfileController {
    constructor(
        private profileService: ProfileService,
        private userService: UserService,
        private poetService: PoetService
    ) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('USER')
    @Get('/detail/')
    async getCollection(
        @Param('id') id: number
    ): Promise<Collection | undefined> {
        return this.profileService.findCollectionById(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('USER')
    @Post('/collection/add')
    async addCollection(
        @Body() collection: CollectionDto,
        @CurrentUser() user: User
    ): Promise<ResponseMessage<Collection[] | undefined>> {
        const currentUser = await this.userService.findUserByName(
            user.username
        );

        if (currentUser === undefined) {
            throw new Error('cannot find user');
        }

        const newUser = await this.profileService.addNewCollection(
            collection,
            currentUser
        );

        const { collections } = newUser;

        const responseMessage = generateResponseMessage<
            Collection[] | undefined
        >(collections);

        return responseMessage;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('USER')
    @Patch('/collection/:collectionId/addPoet/:poetId')
    async updateCollection(
        @Param('collectionId') collectionId: number,
        @Param('poetId') poetId: number
    ): Promise<ResponseMessage<Collection>> {
        const updatedCollection = await this.profileService.updateCollection(
            collectionId,
            poetId
        );

        const responseMessage = generateResponseMessage<Collection>(
            updatedCollection
        );

        return responseMessage;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('USER')
    @Patch('/collection/:collectionId/finish')
    async finishCollection(
        @Param('collectionId') collectionId: number
    ): Promise<ResponseMessage<Collection>> {
        const updatedCollection = await this.profileService.finishCollection(
            collectionId
        );

        if (!updatedCollection) {
            throw new Error('something wrong with finish collection');
        }

        const responseMessage = generateResponseMessage<Collection>(
            updatedCollection
        );

        return responseMessage;
    }
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles('USER')
    // @Post('/favorite')
    // async addPoetToFavorite(
    //     @Body() poet: PoetDto,
    //     @CurrentUser() user: User
    // ): Promise<ResponseMessage<Profile>> {
    //     const poetEntity = await this.poetService.findPoetById(poet.id);
    //     if (poetEntity === undefined) {
    //         throw new BadRequestException('cannot find this poet');
    //     }

    //     const profile = await this.profileService.updateProfileFavorites(
    //         user.profile.id,
    //         poetEntity
    //     );

    //     return generateResponseMessage(profile);
    // }
}
