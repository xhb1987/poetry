import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Poetry } from '@prisma/client';
import { CreatePoetryDto, UpdatePoetryDto } from '../dto/poetry.dto';
import { PoetryCategory } from '../enums/poetry-category.enum';

// Define Poetry type based on Prisma model

@Injectable()
export class PoetryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(limit?: number, offset?: number): Promise<Poetry[]> {
    return await this.prisma.poetry.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });
  }

  async findById(id: string): Promise<Poetry | null> {
    const result = await this.prisma.poetry.findUnique({
      where: { id },
    });
    return result;
  }

  async findByAuthor(author: string): Promise<Poetry[]> {
    const result = await this.prisma.poetry.findMany({
      where: {
        author: {
          contains: author,
          mode: 'insensitive',
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return result;
  }

  async findByChapter(
    chapter: string,
    limit?: number,
    offset?: number,
  ): Promise<Poetry[]> {
    const result = await this.prisma.poetry.findMany({
      where: {
        chapter: {
          contains: chapter,
          mode: 'insensitive',
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });
    return result;
  }

  async findBySection(
    section: string,
    limit?: number,
    offset?: number,
  ): Promise<Poetry[]> {
    const result = await this.prisma.poetry.findMany({
      where: {
        section: {
          contains: section,
          mode: 'insensitive',
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });
    return result;
  }

  async findByChapterAndSection(
    chapter: string,
    section: string,
  ): Promise<Poetry[]> {
    const result = await this.prisma.poetry.findMany({
      where: {
        chapter: {
          contains: chapter,
          mode: 'insensitive',
        },
        section: {
          contains: section,
          mode: 'insensitive',
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return result;
  }

  async search(
    query: string,
    limit?: number,
    offset?: number,
  ): Promise<Poetry[]> {
    const result = await this.prisma.poetry.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
            },
          },
          {
            content: {
              contains: query,
            },
          },
          {
            author: {
              contains: query,
            },
          },
          {
            chapter: {
              contains: query,
            },
          },
          {
            section: {
              contains: query,
            },
          },
        ],
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });
    return result;
  }

  async searchCount(query: string): Promise<number> {
    return await this.prisma.poetry.count({
      where: {
        OR: [
          {
            title: {
              contains: query,
            },
          },
          {
            content: {
              contains: query,
            },
          },
          {
            author: {
              contains: query,
            },
          },
          {
            chapter: {
              contains: query,
            },
          },
          {
            section: {
              contains: query,
            },
          },
        ],
      },
    });
  }

  async create(data: CreatePoetryDto): Promise<Poetry> {
    const createData: CreatePoetryDto = {
      title: data.title,
      content: data.content,
      author: data.author,
      chapter: data.chapter,
      section: data.section,
      rhythmic: data.rhythmic,
    };

    // Handle paragraphs - convert array to JSON
    if (data.paragraphs) {
      createData.paragraphs = data.paragraphs;
    }

    const result = await this.prisma.poetry.create({
      data: createData,
    });
    return result;
  }

  async update(id: string, data: UpdatePoetryDto): Promise<Poetry> {
    const result = await this.prisma.poetry.update({
      where: { id },
      data,
    });
    return result;
  }

  async delete(id: string): Promise<Poetry> {
    const result = await this.prisma.poetry.delete({
      where: { id },
    });
    return result;
  }

  async count(): Promise<number> {
    const result = await this.prisma.poetry.count();
    return result;
  }

  async findRandom(): Promise<Poetry | null> {
    const count = await this.count();
    if (count === 0) return null;

    const randomIndex = Math.floor(Math.random() * count);
    const result = await this.prisma.poetry.findMany({
      skip: randomIndex,
      take: 1,
    });

    return result[0] || null;
  }

  async exists(id: string): Promise<boolean> {
    const poetry = await this.prisma.poetry.findUnique({
      where: { id },
      select: { id: true },
    });
    return !!poetry;
  }

  // Category-based methods
  async findByCategory(
    category: PoetryCategory,
    limit?: number,
    offset?: number,
  ): Promise<Poetry[]> {
    const where = this.getCategoryFilter(category);
    return await this.prisma.poetry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });
  }

  async searchByCategory(
    query: string,
    category: PoetryCategory,
    limit?: number,
    offset?: number,
  ): Promise<Poetry[]> {
    const categoryFilter = this.getCategoryFilter(category);
    return await this.prisma.poetry.findMany({
      where: {
        ...categoryFilter,
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { content: { contains: query, mode: 'insensitive' } },
          { author: { contains: query, mode: 'insensitive' } },
          { chapter: { contains: query, mode: 'insensitive' } },
          { section: { contains: query, mode: 'insensitive' } },
          { rhythmic: { contains: query, mode: 'insensitive' } },
        ],
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });
  }

  async searchCountByCategory(
    query: string,
    category: PoetryCategory,
  ): Promise<number> {
    const categoryFilter = this.getCategoryFilter(category);
    return await this.prisma.poetry.count({
      where: {
        ...categoryFilter,
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { content: { contains: query, mode: 'insensitive' } },
          { author: { contains: query, mode: 'insensitive' } },
          { chapter: { contains: query, mode: 'insensitive' } },
          { section: { contains: query, mode: 'insensitive' } },
          { rhythmic: { contains: query, mode: 'insensitive' } },
        ],
      },
    });
  }

  async findRandomByCategory(
    category?: PoetryCategory,
  ): Promise<Poetry | null> {
    const where = category ? this.getCategoryFilter(category) : {};

    // Get total count with filter
    const count = await this.prisma.poetry.count({ where });
    if (count === 0) return null;

    // Generate random skip value
    const skip = Math.floor(Math.random() * count);

    const result = await this.prisma.poetry.findMany({
      where,
      skip,
      take: 1,
    });

    return result[0] || null;
  }

  async countByCategory(category: PoetryCategory): Promise<number> {
    const where = this.getCategoryFilter(category);
    return await this.prisma.poetry.count({ where });
  }

  async getRhythmicPatterns(
    limit?: number,
  ): Promise<{ rhythmic: string; count: number }[]> {
    const result = await this.prisma.poetry.groupBy({
      by: ['rhythmic'],
      where: {
        rhythmic: { not: null },
      },
      _count: {
        rhythmic: true,
      },
      orderBy: {
        _count: {
          rhythmic: 'desc',
        },
      },
      take: limit,
    });

    return result.map((item) => ({
      rhythmic: item.rhythmic as string,
      count: item._count?.rhythmic || 0,
    }));
  }

  async findByRhythmic(
    rhythmic: string,
    limit?: number,
    offset?: number,
  ): Promise<Poetry[]> {
    return await this.prisma.poetry.findMany({
      where: {
        rhythmic: {
          equals: rhythmic,
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });
  }

  // Helper method to get category filter
  private getCategoryFilter(category: PoetryCategory): Record<string, any> {
    return {
      category: category,
    };
  }
}
