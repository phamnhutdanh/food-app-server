/*
  Warnings:

  - You are about to drop the column `productId` on the `ProductSize` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductSize" DROP CONSTRAINT "ProductSize_productId_fkey";

-- DropIndex
DROP INDEX "products_title_key";

-- AlterTable
ALTER TABLE "ProductSize" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "productSizeId" TEXT;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_productSizeId_fkey" FOREIGN KEY ("productSizeId") REFERENCES "ProductSize"("id") ON DELETE SET NULL ON UPDATE CASCADE;
