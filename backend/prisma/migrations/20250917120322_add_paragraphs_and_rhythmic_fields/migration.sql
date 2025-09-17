-- AlterTable
ALTER TABLE "public"."poems" ADD COLUMN     "paragraphs" JSONB,
ADD COLUMN     "rhythmic" TEXT,
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "content" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "poems_rhythmic_idx" ON "public"."poems"("rhythmic");
