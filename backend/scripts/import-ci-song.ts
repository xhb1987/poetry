import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface CiSongPoetry {
  author: string;
  paragraphs: string[];
  rhythmic: string;
}

async function importCiSongData() {
  try {
    const filePath = path.resolve(__dirname, '../data/ci.song.0.json');
    const data: CiSongPoetry[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    console.log(`📚 Found ${data.length} ci.song poems to import`);

    let imported = 0;
    let skipped = 0;

    for (const [index, poem] of data.entries()) {
      try {
        // Generate a title from the first line of paragraphs or use rhythmic + author
        const title =
          poem.paragraphs && poem.paragraphs.length > 0
            ? poem.paragraphs[0].substring(0, 30) +
              (poem.paragraphs[0].length > 30 ? '...' : '')
            : `${poem.rhythmic || 'Unknown'} - ${poem.author || 'Anonymous'}`;

        // Join paragraphs for backward compatibility content field
        const content = poem.paragraphs ? poem.paragraphs.join('\n') : '';

        await prisma.poetry.create({
          data: {
            title: title,
            content: content,
            paragraphs: poem.paragraphs,
            rhythmic: poem.rhythmic,
            author: poem.author,
            chapter: null, // ci.song doesn't have chapters
            section: null, // ci.song doesn't have sections
          },
        });

        imported++;

        // Log progress every 100 items for better visibility
        if (imported % 100 === 0) {
          console.log(`📊 Progress: ${imported}/${data.length} imported`);
        } else if (imported <= 10 || imported % 50 === 0) {
          // Show details for first 10 and every 50th item
          console.log(
            `✅ Imported ${imported}: "${title}" by ${poem.author} (${poem.rhythmic})`,
          );
        }
      } catch (error: any) {
        skipped++;
        if (skipped <= 5) {
          console.log(
            `⚠️  Skipped poem ${index + 1}: ${error.message || error}`,
          );
        }
      }
    }

    console.log(`\n🎉 Import completed!`);
    console.log(`✅ Successfully imported: ${imported} poems`);
    console.log(`⚠️  Skipped: ${skipped} poems`);
    console.log(`📊 Total processed: ${data.length} poems`);

    // Show some statistics
    const totalPoems = await prisma.poetry.count();
    const ciSongPoems = await prisma.poetry.count({
      where: {
        rhythmic: { not: null },
      },
    });

    console.log(`\n📈 Database Statistics:`);
    console.log(`📚 Total poems in database: ${totalPoems}`);
    console.log(`🎵 Ci.song poems (with rhythmic): ${ciSongPoems}`);

    // Show some sample rhythmic patterns
    const topRhythmic = await prisma.poetry.groupBy({
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
      take: 10,
    });

    console.log(`\n🎵 Top 10 Rhythmic Patterns:`);
    topRhythmic.forEach((item, index) => {
      console.log(
        `${index + 1}. ${item.rhythmic}: ${item._count.rhythmic} poems`,
      );
    });
  } catch (error: any) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

console.log('🚀 Starting ci.song import process...');
importCiSongData();
