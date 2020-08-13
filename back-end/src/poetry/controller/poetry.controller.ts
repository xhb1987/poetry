import { Controller, Get, Param } from '@nestjs/common';
import PoetryService from '../service/poetry.service';
import { CurrentUser } from '../../common/decorator/current.user.decorator';
import { User } from '../../user/entity/user.entity';
import UserService from '../../user/service/user-service';
import { Poetry } from '../entity/poetry.entity';
import { ResponseMessage } from '../../common/response-messge/types';
import generateResponseMessage from '../../common/response-messge/response-message';

@Controller('/poetry')
export class PoetryController {
    constructor(private poetryService: PoetryService) {}

    @Get('/detail/content/:content')
    async getPoetryByTitleOrParagraphs(
        @Param('content') content: string
    ): Promise<ResponseMessage<Poetry[] | undefined>> {
        const poets = await this.poetryService.findPoetByTitleOrParagraphs(
            content
        );
        const responseMessage = generateResponseMessage<Poetry[] | undefined>(
            poets
        );
        return responseMessage;
    }

    @Get('/detail/author/:author')
    async getPoetryByAuthor(
        @Param('author') author: string,
        @CurrentUser() user: User
    ): Promise<Poetry[] | undefined> {
        return this.poetryService.findPoetByAuthor(author);
    }
}
