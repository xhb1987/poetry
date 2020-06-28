import { Controller, UseGuards, Get, Param } from '@nestjs/common';
import PoetService from '../service/poet.service';
import { CurrentUser } from '../../common/decorator/current.user.decorator';
import { User } from '../../user/entity/user.entity';
import UserService from '../../user/service/user-service';
import { Poet } from '../entity/poet.entity';
import { ResponseMessage } from '../../common/response-messge/types';
import generateResponseMessage from '../../common/response-messge/response-message';

@Controller('/poet')
export class PoetController {
    constructor(
        private poetService: PoetService,
        private userService: UserService
    ) {}

    @Get('/detail/content/:content')
    async getPoetByTitleOrParagraphs(
        @Param('content') content: string,
        @CurrentUser() user: User
    ): Promise<ResponseMessage<Poet[] | undefined>> {
        const poets = await this.poetService.findPoetByTitleOrParagraphs(
            content
        );
        const responseMessage = generateResponseMessage<Poet[] | undefined>(
            poets
        );
        return responseMessage;
    }

    @Get('/detail/author/:author')
    async getPoetByAuthor(
        @Param('author') author: string,
        @CurrentUser() user: User
    ): Promise<Poet[] | undefined> {
        return this.poetService.findPoetByAuthor(author);
    }
}