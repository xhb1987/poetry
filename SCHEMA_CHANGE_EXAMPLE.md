# Example: Adding a new table for user favorites

## Step 1: Update the Prisma schema

Edit `backend/prisma/schema.prisma` to add a new model:

```prisma
model UserFavorite {
  id        String   @id @default(cuid())
  userId    String
  poetryId  String
  createdAt DateTime @default(now())

  // Relations
  user    User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  poetry  Poetry @relation(fields: [poetryId], references: [id], onDelete: Cascade)

  // Prevent duplicate favorites
  @@unique([userId, poetryId])
  @@index([userId])
  @@index([poetryId])
  @@map("user_favorites")
}
```

## Step 2: Update related models

Add relation fields to existing models:

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Add relation to favorites
  favorites UserFavorite[]

  @@map("users")
}

model Poetry {
  id        String   @id @default(cuid())
  title     String
  content   String
  author    String?
  chapter   String?
  section   String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Add relation to favorites
  favoritedBy UserFavorite[]

  @@index([author])
  @@index([chapter])
  @@index([section])
  @@index([createdAt])
  @@map("poems")
}
```

## Step 3: Create and apply migration

### Development:

```bash
cd backend
npm run db:migrate
# This will prompt for a migration name: "add_user_favorites"
```

### Docker/Production:

```bash
# First, build new image with updated schema
npm run docker:build

# Then apply migration
npm run db:migrate:docker
# or
./scripts/db/migrate.sh migrate
```

## Step 4: Update your application code

Create services and endpoints to handle the new functionality:

```typescript
// backend/src/favorites/favorites.service.ts
@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async addFavorite(userId: string, poetryId: string) {
    return this.prisma.userFavorite.create({
      data: { userId, poetryId },
    });
  }

  async removeFavorite(userId: string, poetryId: string) {
    return this.prisma.userFavorite.delete({
      where: {
        userId_poetryId: { userId, poetryId },
      },
    });
  }

  async getUserFavorites(userId: string) {
    return this.prisma.userFavorite.findMany({
      where: { userId },
      include: { poetry: true },
    });
  }
}
```

## Step 5: Test the changes

```bash
# Check migration status
npm run db:status

# Test with Docker environment
npm run docker:prod
curl http://localhost:3000/api/users/123/favorites
```
