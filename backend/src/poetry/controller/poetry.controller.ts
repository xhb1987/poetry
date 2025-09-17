import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { PoetryService } from '../service/poetry.service';

import { CreatePoetryDto, UpdatePoetryDto } from '../dto/poetry.dto';
import { ExceptionHelper } from '../../common/exceptions/exception-helper';
import { Poetry } from '@prisma/client';
import { PoetryCategory } from '../enums/poetry-category.enum';

// Define interfaces for better type safety
interface SearchResult {
  results: Poetry[];
  total: number;
}

interface CategoryInfo {
  value: PoetryCategory;
  label: string;
  description: string;
}

interface DailyPoetryResponse {
  message: string;
  date: string;
  category: string;
  poetry: Poetry;
}

interface RandomPoetryResponse {
  message: string;
  category: string;
  poetry: Poetry;
}

interface CategoryStatsResponse {
  category: PoetryCategory;
  count: number;
  name: string;
}

interface RhythmicPattern {
  rhythmic: string;
  count: number;
}

@Controller('poetry')
export class PoetryController {
  constructor(private readonly poetryService: PoetryService) {}

  @Get('test')
  async test(): Promise<any> {
    return {
      message: 'Test endpoint working',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('all-poetry')
  async findAll(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Query('category') category?: PoetryCategory,
  ): Promise<Poetry[]> {
    try {
      console.log('findAll called with:', { limit, offset, category });

      const limitNum = limit ? parseInt(limit) : undefined;
      const offsetNum = offset ? parseInt(offset) : undefined;

      let result: Poetry[];
      if (category && Object.values(PoetryCategory).includes(category)) {
        console.log('Using category filter:', category);
        result = await this.poetryService.findByCategory(
          category,
          limitNum,
          offsetNum,
        );
      } else {
        console.log('Using findAll without category filter');
        result = await this.poetryService.findAll(limitNum, offsetNum);
      }

      console.log('Query result count:', result.length);
      return result;
    } catch (error) {
      console.error('Error in findAll:', error);
      throw error;
    }
  }

  @Get('search')
  async search(
    @Query('q') query: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Query('category') category?: PoetryCategory,
  ): Promise<{
    results: Poetry[];
    total: number;
    query: string;
    category?: PoetryCategory;
    limit?: number;
    offset?: number;
  }> {
    if (!query || query.trim().length === 0) {
      throw ExceptionHelper.invalidSearchQuery();
    }

    const limitNum = limit ? parseInt(limit) : undefined;
    const offsetNum = offset ? parseInt(offset) : undefined;

    let searchResult: SearchResult;
    if (category && Object.values(PoetryCategory).includes(category)) {
      searchResult = await this.poetryService.searchByCategory(
        query.trim(),
        category,
        limitNum,
        offsetNum,
      );
    } else {
      searchResult = await this.poetryService.searchPoetry(
        query.trim(),
        limitNum,
        offsetNum,
      );
    }

    return {
      results: searchResult.results,
      total: searchResult.total,
      query: query.trim(),
      category,
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
  async getDailyPoetry(
    @Query('category') category?: PoetryCategory,
  ): Promise<DailyPoetryResponse> {
    let dailyPoetry: Poetry | null;
    if (category && Object.values(PoetryCategory).includes(category)) {
      dailyPoetry = await this.poetryService.getDailyPoetryByCategory(category);
    } else {
      dailyPoetry = await this.poetryService.getDailyPoetry();
    }

    if (!dailyPoetry) {
      throw ExceptionHelper.emptyPoetryCollection();
    }
    return {
      message: 'Poetry of the day',
      date: new Date().toISOString().split('T')[0],
      category: category || 'all',
      poetry: dailyPoetry,
    };
  }

  @Get('categories')
  getCategories(): { categories: CategoryInfo[] } {
    return {
      categories: Object.values(PoetryCategory).map((category) => ({
        value: category,
        label: category,
        description: this.getCategoryDescription(category),
      })),
    };
  }

  @Get('categories/:category/stats')
  async getCategoryStats(
    @Param('category') category: PoetryCategory,
  ): Promise<CategoryStatsResponse | { error: string }> {
    if (!Object.values(PoetryCategory).includes(category)) {
      return { error: 'Invalid category' };
    }
    return (await this.poetryService.getCategoryStats(
      category,
    )) as CategoryStatsResponse;
  }

  @Get('rhythmic-patterns')
  async getRhythmicPatterns(
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ): Promise<RhythmicPattern[]> {
    return await this.poetryService.getRhythmicPatterns(limit);
  }

  @Get('rhythmic/:rhythmic')
  async findByRhythmic(
    @Param('rhythmic') rhythmic: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return await this.poetryService.findByRhythmic(
      rhythmic,
      limit,
      (page - 1) * limit,
    );
  }

  @Get('random')
  async findRandom(
    @Query('category') category?: PoetryCategory,
  ): Promise<RandomPoetryResponse> {
    let randomPoetry: Poetry | null;
    if (category && Object.values(PoetryCategory).includes(category)) {
      randomPoetry = await this.poetryService.findRandomByCategory(category);
    } else {
      randomPoetry = await this.poetryService.findRandom();
    }

    if (!randomPoetry) {
      throw ExceptionHelper.emptyPoetryCollection();
    }
    return {
      message: 'Random poetry',
      category: category || 'all',
      poetry: randomPoetry,
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

  private getCategoryDescription(category: PoetryCategory): string {
    const descriptions = {
      [PoetryCategory.SHIJING]:
        'The Book of Songs (《诗经》) - ancient Chinese poetry collection from the Zhou dynasty',
      [PoetryCategory.SONG_CI]:
        'Song Ci (《宋词》) - lyrical poetry from the Song dynasty with specific rhythmic patterns',
    };
    return descriptions[category] || '';
  }
}
