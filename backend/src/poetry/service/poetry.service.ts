import { Injectable } from '@nestjs/common';
import { PoetryRepository } from '../repository/poetry.repository';
import { ExceptionHelper } from '../../common/exceptions/exception-helper';
import { Poetry } from '@prisma/client';
import { CreatePoetryDto, UpdatePoetryDto } from '../dto/poetry.dto';
import { PoetryCategory } from '../enums/poetry-category.enum';

@Injectable()
export class PoetryService {
  constructor(private readonly poetryRepository: PoetryRepository) {}

  async findAll(limit?: number, offset?: number): Promise<Poetry[]> {
    return await this.poetryRepository.findAll(limit, offset);
  }

  async findOne(id: string): Promise<Poetry | null> {
    const poetry = await this.poetryRepository.findById(id);
    if (!poetry) {
      throw ExceptionHelper.poetryNotFound(id);
    }
    return poetry;
  }

  async create(poetryData: CreatePoetryDto): Promise<Poetry> {
    return await this.poetryRepository.create(poetryData);
  }

  async update(
    id: string,
    poetryData: UpdatePoetryDto,
  ): Promise<Poetry | null> {
    const exists = await this.poetryRepository.exists(id);
    if (!exists) {
      throw ExceptionHelper.poetryNotFound(id);
    }
    return await this.poetryRepository.update(id, poetryData);
  }

  async delete(id: string): Promise<boolean> {
    const exists = await this.poetryRepository.exists(id);
    if (!exists) {
      throw ExceptionHelper.poetryNotFound(id);
    }
    await this.poetryRepository.delete(id);
    return true;
  }

  // Alias for delete to match controller
  async remove(id: string): Promise<boolean> {
    return await this.delete(id);
  }

  // Alias for findRandom
  async findRandom(): Promise<Poetry | null> {
    const poetry = await this.poetryRepository.findRandom();
    if (!poetry) {
      throw ExceptionHelper.emptyPoetryCollection();
    }
    return poetry;
  }

  async findRandomByCategory(
    category?: PoetryCategory,
  ): Promise<Poetry | null> {
    const poetry = await this.poetryRepository.findRandomByCategory(category);
    if (!poetry) {
      throw ExceptionHelper.emptyPoetryCollection();
    }
    return poetry;
  }

  // Alias for searchPoetry to match controller
  async search(
    query: string,
    limit?: number,
    offset?: number,
  ): Promise<{ results: Poetry[]; total: number }> {
    return await this.searchPoetry(query, limit, offset);
  }

  async getDailyPoetry(): Promise<Poetry | null> {
    const poetry = await this.poetryRepository.findRandom();
    if (!poetry) {
      throw ExceptionHelper.emptyPoetryCollection();
    }
    return poetry;
  }

  async searchPoetry(
    query: string,
    limit?: number,
    offset?: number,
  ): Promise<{ results: Poetry[]; total: number }> {
    const [results, total] = await Promise.all([
      this.poetryRepository.search(query, limit, offset),
      this.poetryRepository.searchCount(query),
    ]);
    return { results, total };
  }

  async findByAuthor(author: string): Promise<Poetry[]> {
    return await this.poetryRepository.findByAuthor(author);
  }

  async findByChapter(
    chapter: string,
    limit?: number,
    offset?: number,
  ): Promise<Poetry[]> {
    return await this.poetryRepository.findByChapter(chapter, limit, offset);
  }

  async findBySection(
    section: string,
    limit?: number,
    offset?: number,
  ): Promise<Poetry[]> {
    return await this.poetryRepository.findBySection(section, limit, offset);
  }

  // Category-based methods
  async findByCategory(
    category: PoetryCategory,
    limit?: number,
    offset?: number,
  ): Promise<Poetry[]> {
    return await this.poetryRepository.findByCategory(category, limit, offset);
  }

  async searchByCategory(
    query: string,
    category: PoetryCategory,
    limit?: number,
    offset?: number,
  ): Promise<{ results: Poetry[]; total: number }> {
    const [results, total] = await Promise.all([
      this.poetryRepository.searchByCategory(query, category, limit, offset),
      this.poetryRepository.searchCountByCategory(query, category),
    ]);
    return { results, total };
  }

  async getDailyPoetryByCategory(
    category?: PoetryCategory,
  ): Promise<Poetry | null> {
    const poetry = await this.poetryRepository.findRandomByCategory(category);
    if (!poetry) {
      throw ExceptionHelper.emptyPoetryCollection();
    }
    return poetry;
  }

  async getRhythmicPatterns(
    limit?: number,
  ): Promise<{ rhythmic: string; count: number }[]> {
    return await this.poetryRepository.getRhythmicPatterns(limit);
  }

  async findByRhythmic(
    rhythmic: string,
    limit?: number,
    offset?: number,
  ): Promise<Poetry[]> {
    return await this.poetryRepository.findByRhythmic(rhythmic, limit, offset);
  }

  async getCategoryStats(category?: PoetryCategory): Promise<any> {
    if (category) {
      // Return stats for specific category
      const count = await this.poetryRepository.countByCategory(category);
      return {
        category,
        count,
        name: category === PoetryCategory.SHIJING ? '诗经' : '宋词',
      };
    }

    // Return stats for all categories
    const [shijingCount, songCiCount, total] = await Promise.all([
      this.poetryRepository.countByCategory(PoetryCategory.SHIJING),
      this.poetryRepository.countByCategory(PoetryCategory.SONG_CI),
      this.poetryRepository.count(),
    ]);

    return {
      [PoetryCategory.SHIJING]: {
        count: shijingCount,
        name: '诗经',
      },
      [PoetryCategory.SONG_CI]: {
        count: songCiCount,
        name: '宋词',
      },
      total,
    };
  }
}
