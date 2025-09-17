import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface SongCiData {
  author: string;
  paragraphs: string[];
  rhythmic: string;
}

async function importSongCi() {
  try {
    console.log('Starting Song Ci import...');

    // Read the Song Ci JSON data
    const dataPath = path.join(__dirname, '../data/ci.song.0.json');
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const songCiData = JSON.parse(rawData) as SongCiData[];

    console.log(`Found ${songCiData.length} Song Ci entries to import`);

    // Import in batches to avoid memory issues
    const batchSize = 100;
    let importedCount = 0;

    for (let i = 0; i < songCiData.length; i += batchSize) {
      const batch = songCiData.slice(i, i + batchSize);

      const poetryData = batch.map((item, index) => ({
        title: item.rhythmic || `宋词 ${i + index + 1}`, // Use rhythmic as title, or generate a title
        content: item.paragraphs.join('\n'), // Join paragraphs with newlines
        author: item.author,
        chapter: item.rhythmic, // Store rhythmic pattern as chapter
        section: null, // Song Ci doesn't have sections like Shijing
        category: 'song_ci' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      // Use createMany for efficient batch insertion
      await prisma.poetry.createMany({
        data: poetryData,
        skipDuplicates: true, // Skip if duplicate data exists
      });

      importedCount += batch.length;
      console.log(
        `Imported ${importedCount}/${songCiData.length} Song Ci entries...`,
      );
    }

    console.log(`✅ Successfully imported ${importedCount} Song Ci entries`);

    // Update existing Shijing data to have the correct category
    const shijingUpdateResult = await prisma.poetry.updateMany({
      where: {
        OR: [{ category: null }, { category: '' }],
      },
      data: {
        category: 'shijing',
      },
    });

    console.log(
      `✅ Updated ${shijingUpdateResult.count} existing entries to 'shijing' category`,
    );

    // Show final statistics
    const totalCount = await prisma.poetry.count();
    const shijingCount = await prisma.poetry.count({
      where: { category: 'shijing' },
    });
    const songCiCount = await prisma.poetry.count({
      where: { category: 'song_ci' },
    });

    console.log('\n📊 Database Statistics:');
    console.log(`Total poetry entries: ${totalCount}`);
    console.log(`Shijing entries: ${shijingCount}`);
    console.log(`Song Ci entries: ${songCiCount}`);
  } catch (error) {
    console.error('❌ Error importing Song Ci data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the import
if (require.main === module) {
  importSongCi()
    .then(() => {
      console.log('🎉 Song Ci import completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Import failed:', error);
      process.exit(1);
    });
}

export { importSongCi };
