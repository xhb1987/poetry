-- AlterTable
ALTER TABLE "public"."poems" ADD COLUMN     "category" TEXT;

-- CreateIndex
CREATE INDEX "poems_category_idx" ON "public"."poems"("category");
