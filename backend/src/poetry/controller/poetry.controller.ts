import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { PoetryService } from '../service/poetry.service';

import { CreatePoetryDto, UpdatePoetryDto } from '../dto/poetry.dto';
import { ExceptionHelper } from '../../common/exceptions/exception-helper';
import { Poetry } from '@prisma/client';

@Controller('poetry')
export class PoetryController {
  constructor(private readonly poetryService: PoetryService) {}

  @Get('all-poetry')
  async findAll(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ): Promise<Poetry[]> {
    return await this.poetryService.findAll(
      limit ? parseInt(limit) : undefined,
      offset ? parseInt(offset) : undefined,
    );
  }

  @Get('search')
  async search(
    @Query('q') query: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ): Promise<{
    results: Poetry[];
    total: number;
    query: string;
    limit?: number;
    offset?: number;
  }> {
    if (!query || query.trim().length === 0) {
      throw ExceptionHelper.invalidSearchQuery();
    }

    const limitNum = limit ? parseInt(limit) : undefined;
    const offsetNum = offset ? parseInt(offset) : undefined;

    const { results, total } = await this.poetryService.searchPoetry(
      query.trim(),
      limitNum,
      offsetNum,
    );

    return {
      results,
      total,
      query: query.trim(),
      limit: limitNum,
      offset: offsetNum,
    };
  }

  @Get('search/chapter/:chapter')
  async searchByChapter(
    @Param('chapter') chapter: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ): Promise<Poetry[]> {
    const limitNum = limit ? parseInt(limit) : undefined;
    const offsetNum = offset ? parseInt(offset) : undefined;
    return await this.poetryService.findByChapter(chapter, limitNum, offsetNum);
  }

  @Get('search/section/:section')
  async searchBySection(
    @Param('section') section: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ): Promise<Poetry[]> {
    const limitNum = limit ? parseInt(limit) : undefined;
    const offsetNum = offset ? parseInt(offset) : undefined;
    return await this.poetryService.findBySection(section, limitNum, offsetNum);
  }

  @Get('daily')
  async getDailyPoetry() {
    const dailyPoetry = await this.poetryService.getDailyPoetry();
    if (!dailyPoetry) {
      throw ExceptionHelper.emptyPoetryCollection();
    }
    return {
      message: 'Poetry of the day',
      date: new Date().toISOString().split('T')[0],
      poetry: dailyPoetry,
    };
  }

  @Get(':poetryId')
  async findOne(@Param('poetryId') poetryId: string): Promise<Poetry> {
    const poetry = await this.poetryService.findOne(poetryId);
    if (!poetry) {
      throw ExceptionHelper.poetryNotFound(poetryId);
    }
    return poetry;
  }

  @Post()
  async create(@Body() createPoetryDto: CreatePoetryDto): Promise<Poetry> {
    return await this.poetryService.create(createPoetryDto);
  }

  @Put(':poetryId')
  async update(
    @Param('poetryId') poetryId: string,
    @Body() updatePoetryDto: UpdatePoetryDto,
  ): Promise<Poetry> {
    const poetry = await this.poetryService.update(poetryId, updatePoetryDto);
    if (!poetry) {
      throw ExceptionHelper.poetryNotFound(poetryId);
    }
    return poetry;
  }

  @Delete(':poetryId')
  async delete(@Param('poetryId') poetryId: string) {
    const deleted = await this.poetryService.delete(poetryId);
    if (!deleted) {
      throw ExceptionHelper.poetryNotFound(poetryId);
    }
    return { message: 'Poetry deleted successfully' };
  }
}
