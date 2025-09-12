import { Module } from '@nestjs/common';
import { PoetryController } from './controller/poetry.controller';
import { PoetryService } from './service/poetry.service';
import { PoetryRepository } from './repository/poetry.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PoetryController],
  providers: [PoetryService, PoetryRepository],
  exports: [PoetryService, PoetryRepository],
})
export class PoetryModule {}
