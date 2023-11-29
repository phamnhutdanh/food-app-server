/*
  Warnings:

  - You are about to drop the column `productId` on the `ProductSize` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductSize" DROP CONSTRAINT "ProductSize_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductTag" DROP CONSTRAINT "ProductTag_productId_fkey";

-- AlterTable
ALTER TABLE "ProductSize" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "sizeId" TEXT;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "ProductSize"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductTag" ADD CONSTRAINT "ProductTag_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
