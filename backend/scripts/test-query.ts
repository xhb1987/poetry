import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testQuery() {
  try {
    console.log('Testing database connection...');

    // Test simple count
    const count = await prisma.poetry.count();
    console.log(`Total poetry count: ${count}`);

    // Test getting one record
    const poetry = await prisma.poetry.findFirst({
      take: 1,
    });

    if (poetry) {
      console.log('Found poetry:', {
        id: poetry.id,
        title: poetry.title,
        author: poetry.author,
        category: poetry.category,
        hasParagraphs: !!poetry.paragraphs,
        paragraphsType: typeof poetry.paragraphs,
      });

      // Try to JSON.stringify the result
      try {
        const serialized = JSON.stringify(poetry);
        console.log('Serialization successful, length:', serialized.length);
      } catch (error) {
        console.error('Serialization failed:', error);
      }
    } else {
      console.log('No poetry found');
    }
  } catch (error) {
    console.error('Database query failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testQuery();
