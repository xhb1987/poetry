-- AlterTable
ALTER TABLE "public"."poems" ADD COLUMN     "chapter" TEXT,
ADD COLUMN     "section" TEXT,
ALTER COLUMN "author" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "poems_chapter_idx" ON "public"."poems"("chapter");

-- CreateIndex
CREATE INDEX "poems_section_idx" ON "public"."poems"("section");
