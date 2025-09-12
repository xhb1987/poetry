import { Injectable } from '@nestjs/common';
import { PoetryRepository } from '../repository/poetry.repository';
import { ExceptionHelper } from '../../common/exceptions/exception-helper';
import { Poetry } from '@prisma/client';
import { CreatePoetryDto, UpdatePoetryDto } from '../dto/poetry.dto';

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
}
