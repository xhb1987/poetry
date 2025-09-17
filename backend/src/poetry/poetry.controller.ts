import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { PoetryService } from './service/poetry.service';
import { CreatePoetryDto, UpdatePoetryDto } from './dto/poetry.dto';
import { PoetryCategory } from './enums/poetry-category.enum';

@Controller('poetry')
export class PoetryController {
  constructor(private readonly poetryService: PoetryService) {}

  @Post()
  create(@Body() createPoetryDto: CreatePoetryDto) {
    return this.poetryService.create(createPoetryDto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('category') category?: PoetryCategory,
  ) {
    if (category && Object.values(PoetryCategory).includes(category)) {
      return this.poetryService.findByCategory(
        category,
        limit,
        (page - 1) * limit,
      );
    }
    return this.poetryService.findAll(limit, (page - 1) * limit);
  }

  @Get('search')
  search(
    @Query('q') query: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('category') category?: PoetryCategory,
  ) {
    if (!query) {
      return { poems: [], total: 0, page, limit };
    }

    if (category && Object.values(PoetryCategory).includes(category)) {
      return this.poetryService.searchByCategory(
        query,
        category,
        limit,
        (page - 1) * limit,
      );
    }

    return this.poetryService.search(query, limit, (page - 1) * limit);
  }

  @Get('random')
  findRandom(@Query('category') category?: PoetryCategory) {
    if (category && Object.values(PoetryCategory).includes(category)) {
      return this.poetryService.findRandomByCategory(category);
    }
    return this.poetryService.findRandom();
  }

  @Get('daily')
  getDailyPoetry(@Query('category') category?: PoetryCategory) {
    if (category && Object.values(PoetryCategory).includes(category)) {
      return this.poetryService.getDailyPoetryByCategory(category);
    }
    return this.poetryService.getDailyPoetry();
  }

  @Get('categories')
  getCategories() {
    return {
      categories: Object.values(PoetryCategory).map((category) => ({
        value: category,
        label: category,
        description: this.getCategoryDescription(category),
      })),
    };
  }

  @Get('categories/:category/stats')
  getCategoryStats(@Param('category') category: PoetryCategory) {
    if (!Object.values(PoetryCategory).includes(category)) {
      return { error: 'Invalid category' };
    }
    return this.poetryService.getCategoryStats(category);
  }

  @Get('rhythmic-patterns')
  getRhythmicPatterns(
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) {
    return this.poetryService.getRhythmicPatterns(limit);
  }

  @Get('rhythmic/:rhythmic')
  findByRhythmic(
    @Param('rhythmic') rhythmic: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.poetryService.findByRhythmic(
      rhythmic,
      limit,
      (page - 1) * limit,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.poetryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePoetryDto: UpdatePoetryDto) {
    return this.poetryService.update(id, updatePoetryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.poetryService.remove(id);
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
