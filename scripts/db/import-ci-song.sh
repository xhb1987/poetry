#!/bin/bash

# Specialized import script for ci.song JSON format
# Handles the new schema with paragraphs and rhythmic fields

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

CONTAINER_NAME="poetry_app"

echo -e "${BLUE}📚 Ci.Song Poetry Import Tool${NC}"
echo "=============================="

# Check if containers are running
check_containers() {
    if ! docker ps --format "table {{.Names}}" | grep -q "$CONTAINER_NAME"; then
        echo -e "${RED}❌ Container '$CONTAINER_NAME' is not running${NC}"
        echo -e "${YELLOW}💡 Start containers with: npm run docker:prod${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Container is running${NC}"
}

# Import ci.song JSON format
import_ci_song() {
    local file_path="$1"
    
    if [[ ! -f "$file_path" ]]; then
        echo -e "${RED}❌ File not found: $file_path${NC}"
        exit 1
    fi
    
    echo -e "${BLUE}📥 Importing ci.song data from: $file_path${NC}"
    
    # Copy file to container
    docker cp "$file_path" "$CONTAINER_NAME:/app/import_ci_song.json"
    
    # Create specialized import script for ci.song format
    cat > ci_song_import.ts << 'EOF'
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

interface CiSongPoetry {
  author: string;
  paragraphs: string[];
  rhythmic: string;
}

async function importCiSongData() {
  try {
    const data: CiSongPoetry[] = JSON.parse(fs.readFileSync('/app/import_ci_song.json', 'utf8'));
    
    console.log(`📚 Found ${data.length} ci.song poems to import`);
    
    let imported = 0;
    let skipped = 0;
    
    for (const [index, poem] of data.entries()) {
      try {
        // Generate a title from the first line of paragraphs or use rhythmic + author
        const title = poem.paragraphs && poem.paragraphs.length > 0 
          ? poem.paragraphs[0].substring(0, 20) + (poem.paragraphs[0].length > 20 ? '...' : '')
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
        console.log(`✅ Imported ${imported}: "${title}" by ${poem.author} (${poem.rhythmic})`);
        
        // Log progress every 100 items
        if (imported % 100 === 0) {
          console.log(`📊 Progress: ${imported}/${data.length} imported`);
        }
      } catch (error: any) {
        skipped++;
        console.log(`⚠️  Skipped poem ${index + 1}: ${error.message || error}`);
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
        rhythmic: { not: null }
      }
    });
    
    console.log(`\n📈 Database Statistics:`);
    console.log(`📚 Total poems in database: ${totalPoems}`);
    console.log(`🎵 Ci.song poems (with rhythmic): ${ciSongPoems}`);
    
  } catch (error: any) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

importCiSongData();
EOF
    
    # Copy import script to container and run it
    docker cp ci_song_import.ts "$CONTAINER_NAME:/app/ci_song_import.ts"
    
    echo -e "${YELLOW}🚀 Starting import process...${NC}"
    
    if docker exec "$CONTAINER_NAME" npx ts-node ci_song_import.ts; then
        echo -e "${GREEN}✅ Ci.song import completed successfully!${NC}"
        # Clean up
        docker exec "$CONTAINER_NAME" rm -f /app/import_ci_song.json /app/ci_song_import.ts
        rm -f ci_song_import.ts
    else
        echo -e "${RED}❌ Ci.song import failed${NC}"
        rm -f ci_song_import.ts
        exit 1
    fi
}

# Show usage
show_usage() {
    echo "Usage: $0 <ci.song.json.file>"
    echo ""
    echo "This script imports poetry data in ci.song JSON format with:"
    echo "- author: string"
    echo "- paragraphs: string[]"
    echo "- rhythmic: string"
    echo ""
    echo "Example:"
    echo "  $0 backend/data/ci.song.0.json"
}

# Main execution
if [[ -z "$1" ]]; then
    echo -e "${RED}❌ Please specify a ci.song JSON file to import${NC}"
    show_usage
    exit 1
fi

check_containers
import_ci_song "$1"