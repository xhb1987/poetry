import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface ShijingPoetry {
  title: string;
  chapter: string;
  section: string;
  content: string[];
}

// Function to load Shijing data
function loadShijingData(): any[] {
  try {
    const dataPath = path.resolve(__dirname, '../data/shijing.json');
    const shijingData: ShijingPoetry[] = JSON.parse(
      fs.readFileSync(dataPath, 'utf8'),
    );

    console.log(`📚 Found ${shijingData.length} poems in Shijing data`);

    // Transform Shijing data to match our Poetry schema
    return shijingData.map((poem) => ({
      title: poem.title,
      author: null, // Shijing poems don't have individual authors
      chapter: poem.chapter, // Keep chapter separate (e.g., "国风")
      section: poem.section, // Keep section separate (e.g., "周南")
      content: poem.content.join('\n'), // Join content lines with newlines
    }));
  } catch (error) {
    console.log('⚠️  Could not load Shijing data, using sample data instead');
    console.error('Error details:', error);

    // Fallback to sample data
    return [
      {
        title: 'The Road Not Taken',
        content: `Two roads diverged in a yellow wood,
And sorry I could not travel both
And be one traveler, long I stood
And looked down one as far as I could
To where it bent in the undergrowth;

Then took the other, as just as fair,
And having perhaps the better claim,
Because it was grassy and wanted wear;
Though as for that the passing there
Had worn them really about the same,

And both that morning equally lay
In leaves no step had trodden black.
Oh, I kept the first for another day!
Yet knowing how way leads on to way,
I doubted if I should ever be back.

I shall be telling this with a sigh
Somewhere ages and ages hence:
Two roads diverged in a wood, and I—
I took the one less traveled by,
And that has made all the difference.`,
        author: 'Robert Frost',
      },
      {
        title: 'Still I Rise',
        content: `You may write me down in history
With your bitter, twisted lies,
You may trod me in the very dirt
But still, like dust, I'll rise.`,
        author: 'Maya Angelou',
      },
    ];
  }
}

// Load the poetry data
const poetryData = loadShijingData();

async function main() {
  console.log('🌱 Starting database seed...');

  try {
    // Clear existing data
    console.log('🗑️  Clearing existing poetry data...');
    await prisma.poetry.deleteMany({});

    // Insert new data
    console.log('📝 Inserting poetry data...');

    for (const poem of poetryData) {
      const createdPoem = await prisma.poetry.create({
        data: poem,
      });
      console.log(
        `✅ Created: "${createdPoem.title}" (${createdPoem.chapter}·${createdPoem.section})`,
      );
    }

    console.log(`🎉 Successfully seeded ${poetryData.length} poems!`);

    // Display summary
    const totalCount = await prisma.poetry.count();
    console.log(`📊 Total poems in database: ${totalCount}`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
