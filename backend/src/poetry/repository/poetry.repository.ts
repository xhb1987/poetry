import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Poetry } from '@prisma/client';
import { CreatePoetryDto, UpdatePoetryDto } from '../dto/poetry.dto';

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
    const result = await this.prisma.poetry.create({
      data,
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
    // First try to find poetry with content
    const countWithContent = await this.prisma.poetry.count({
      where: {
        content: {
          not: '',
        },
      },
    });

    if (countWithContent > 0) {
      const randomIndex = Math.floor(Math.random() * countWithContent);
      const result = await this.prisma.poetry.findMany({
        where: {
          content: {
            not: '',
          },
        },
        skip: randomIndex,
        take: 1,
      });
      return result[0] || null;
    }

    // Fallback to any poetry if no content is available
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
}
