#!/bin/bash

# Data Import Script for Poetry Application
# Supports various data import formats and sources

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

CONTAINER_NAME="poetry_app"
DATABASE_URL="postgresql://postgres:password123@localhost:5432/poetry_db"

echo -e "${BLUE}📚 Poetry Data Import Tool${NC}"
echo "=========================="

# Check if containers are running
check_containers() {
    if ! docker ps --format "table {{.Names}}" | grep -q "$CONTAINER_NAME"; then
        echo -e "${RED}❌ Container '$CONTAINER_NAME' is not running${NC}"
        echo -e "${YELLOW}💡 Start containers with: npm run docker:up${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Container is running${NC}"
}

# Import from JSON file
import_json() {
    local file_path="$1"
    
    if [[ ! -f "$file_path" ]]; then
        echo -e "${RED}❌ File not found: $file_path${NC}"
        exit 1
    fi
    
    echo -e "${BLUE}📥 Importing data from: $file_path${NC}"
    
    # Copy file to container
    docker cp "$file_path" "$CONTAINER_NAME:/app/import_data.json"
    
    # Create import script
    cat > import_script.ts << 'EOF'
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

interface ImportPoetry {
  title: string;
  content: string;
  author?: string;
  chapter?: string;
  section?: string;
}

async function importData() {
  try {
    const data: ImportPoetry[] = JSON.parse(fs.readFileSync('/app/import_data.json', 'utf8'));
    
    console.log(`📚 Found ${data.length} poems to import`);
    
    let imported = 0;
    for (const poem of data) {
      try {
        await prisma.poetry.create({
          data: {
            title: poem.title,
            content: poem.content,
            author: poem.author || null,
            chapter: poem.chapter || null,
            section: poem.section || null,
          },
        });
        imported++;
        console.log(`✅ Imported: "${poem.title}"`);
      } catch (error) {
        console.log(`⚠️  Skipped duplicate: "${poem.title}"`);
      }
    }
    
    console.log(`🎉 Import completed! ${imported}/${data.length} poems imported`);
  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

importData();
EOF
    
    # Copy import script to container and run it
    docker cp import_script.ts "$CONTAINER_NAME:/app/import_script.ts"
    
    if docker exec "$CONTAINER_NAME" npx ts-node import_script.ts; then
        echo -e "${GREEN}✅ Data import completed successfully${NC}"
        # Clean up
        docker exec "$CONTAINER_NAME" rm -f /app/import_data.json /app/import_script.ts
        rm -f import_script.ts
    else
        echo -e "${RED}❌ Data import failed${NC}"
        rm -f import_script.ts
        exit 1
    fi
}

# Import from CSV file
import_csv() {
    local file_path="$1"
    
    if [[ ! -f "$file_path" ]]; then
        echo -e "${RED}❌ File not found: $file_path${NC}"
        exit 1
    fi
    
    echo -e "${BLUE}📥 Importing CSV data from: $file_path${NC}"
    echo -e "${YELLOW}💡 Expected CSV format: title,content,author,chapter,section${NC}"
    
    # Copy file to container
    docker cp "$file_path" "$CONTAINER_NAME:/app/import_data.csv"
    
    # Create CSV import script
    cat > import_csv_script.ts << 'EOF'
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function importCSV() {
  try {
    const csvContent = fs.readFileSync('/app/import_data.csv', 'utf8');
    const lines = csvContent.split('\n');
    const header = lines[0].split(',');
    
    console.log(`📊 CSV headers: ${header.join(', ')}`);
    console.log(`📚 Found ${lines.length - 1} rows to process`);
    
    let imported = 0;
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const values = line.split(',');
      if (values.length < 2) continue;
      
      try {
        await prisma.poetry.create({
          data: {
            title: values[0]?.trim() || `Poem ${i}`,
            content: values[1]?.trim() || '',
            author: values[2]?.trim() || null,
            chapter: values[3]?.trim() || null,
            section: values[4]?.trim() || null,
          },
        });
        imported++;
        console.log(`✅ Imported: "${values[0]?.trim()}"`);
      } catch (error) {
        console.log(`⚠️  Skipped row ${i}: ${error.message}`);
      }
    }
    
    console.log(`🎉 CSV import completed! ${imported} poems imported`);
  } catch (error) {
    console.error('❌ CSV import failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

importCSV();
EOF
    
    docker cp import_csv_script.ts "$CONTAINER_NAME:/app/import_csv_script.ts"
    
    if docker exec "$CONTAINER_NAME" npx ts-node import_csv_script.ts; then
        echo -e "${GREEN}✅ CSV import completed successfully${NC}"
        docker exec "$CONTAINER_NAME" rm -f /app/import_data.csv /app/import_csv_script.ts
        rm -f import_csv_script.ts
    else
        echo -e "${RED}❌ CSV import failed${NC}"
        rm -f import_csv_script.ts
        exit 1
    fi
}

# Export data to JSON
export_json() {
    local output_file="${1:-poetry_export_$(date +%Y%m%d_%H%M%S).json}"
    
    echo -e "${BLUE}📤 Exporting data to: $output_file${NC}"
    
    cat > export_script.ts << 'EOF'
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function exportData() {
  try {
    const poetry = await prisma.poetry.findMany({
      orderBy: { createdAt: 'asc' }
    });
    
    console.log(`📚 Found ${poetry.length} poems to export`);
    
    const exportData = poetry.map(poem => ({
      title: poem.title,
      content: poem.content,
      author: poem.author,
      chapter: poem.chapter,
      section: poem.section,
    }));
    
    fs.writeFileSync('/app/export_data.json', JSON.stringify(exportData, null, 2));
    console.log(`✅ Export completed: ${poetry.length} poems`);
  } catch (error) {
    console.error('❌ Export failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

exportData();
EOF
    
    docker cp export_script.ts "$CONTAINER_NAME:/app/export_script.ts"
    
    if docker exec "$CONTAINER_NAME" npx ts-node export_script.ts; then
        docker cp "$CONTAINER_NAME:/app/export_data.json" "$output_file"
        echo -e "${GREEN}✅ Data exported to: $output_file${NC}"
        docker exec "$CONTAINER_NAME" rm -f /app/export_data.json /app/export_script.ts
        rm -f export_script.ts
    else
        echo -e "${RED}❌ Export failed${NC}"
        rm -f export_script.ts
        exit 1
    fi
}

# Show usage
show_usage() {
    echo "Usage: $0 <command> [file]"
    echo ""
    echo "Commands:"
    echo "  import-json <file>    Import poetry from JSON file"
    echo "  import-csv <file>     Import poetry from CSV file"
    echo "  export-json [file]    Export poetry to JSON file"
    echo ""
    echo "Examples:"
    echo "  $0 import-json new_poems.json"
    echo "  $0 import-csv poems.csv"
    echo "  $0 export-json backup.json"
    echo ""
    echo "JSON format example:"
    echo "["
    echo "  {"
    echo "    \"title\": \"Poem Title\","
    echo "    \"content\": \"Poem content here...\","
    echo "    \"author\": \"Author Name\","
    echo "    \"chapter\": \"Chapter\","
    echo "    \"section\": \"Section\""
    echo "  }"
    echo "]"
}

# Main execution
case "${1:-help}" in
    "import-json")
        if [[ -z "$2" ]]; then
            echo -e "${RED}❌ Please specify a JSON file to import${NC}"
            show_usage
            exit 1
        fi
        check_containers
        import_json "$2"
        ;;
    "import-csv")
        if [[ -z "$2" ]]; then
            echo -e "${RED}❌ Please specify a CSV file to import${NC}"
            show_usage
            exit 1
        fi
        check_containers
        import_csv "$2"
        ;;
    "export-json")
        check_containers
        export_json "$2"
        ;;
    "help"|*)
        show_usage
        ;;
esac