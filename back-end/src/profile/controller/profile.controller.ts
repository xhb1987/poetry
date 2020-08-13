import {
    Controller,
    Post,
    Get,
    Param,
    UseGuards,
    Body,
    Patch,
    Delete,
} from '@nestjs/common';
import ProfileService from '../service/profile.service';
import UserService from '../../user/service/user-service';
import { CurrentUser } from '../../common/decorator/current.user.decorator';
import { User } from '../../user/entity/user.entity';
import { JwtAuthGuard } from '../../common/guard/jwt-auth.guard';
import { RolesGuard } from '../../common/guard/roles.guard';
import { Roles } from '../../common/decorator/roles.decorator';
import { ResponseMessage } from '../../common/response-messge/types';
import generateResponseMessage from '../../common/response-messge/response-message';
import { Collection } from '../entity/collection.entity';
import { CollectionDto } from '../dto/collection.dto';

@Controller('/profile')
export class ProfileController {
    constructor(
        private profileService: ProfileService,
        private userService: UserService
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
    @Patch('/collection/:collectionId/addPoetry/:poetryId')
    async updateCollection(
        @Param('collectionId') collectionId: number,
        @Param('poetryId') poetryId: number
    ): Promise<ResponseMessage<Collection>> {
        const updatedCollection = await this.profileService.addPoetryToCollection(
            collectionId,
            poetryId
        );

        const responseMessage = generateResponseMessage<Collection>(
            updatedCollection
        );

        return responseMessage;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('USER')
    @Delete('/collection/:collectionId/deletePoet/:poetId')
    async deletePoet(
        @Param('collectionId') collectionId: number,
        @Param('poetId') poetId: number
    ): Promise<ResponseMessage<Collection>> {
        const updatedCollection = await this.profileService.deletePoetryFromCollection(
            collectionId,
            poetId
        );

        if (!updatedCollection) {
            throw new Error();
        }

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

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('USER')
    @Delete('/collection/delete')
    async deleteCollections(
        @Body() data: { collectionIds: number[] },
        @CurrentUser() currentUser: User
    ): Promise<ResponseMessage<Collection[]>> {
        const { collectionIds } = data;
        await this.profileService.deleteCollections(collectionIds);
        const user = await this.userService.findUserByName(
            currentUser.username
        );
        const { collections = [] } = user || {};

        const responseMessage = generateResponseMessage<Collection[]>(
            collections.filter((collection) => !collection.deleteAt)
        );

        return responseMessage;
    }
}
