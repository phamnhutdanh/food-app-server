-- DropForeignKey
ALTER TABLE "RatingProduct" DROP CONSTRAINT "RatingProduct_userId_fkey";

-- AlterTable
ALTER TABLE "RatingProduct" ADD COLUMN     "shopId" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "RatingProduct" ADD CONSTRAINT "RatingProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingProduct" ADD CONSTRAINT "RatingProduct_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shops"("id") ON DELETE SET NULL ON UPDATE CASCADE;
