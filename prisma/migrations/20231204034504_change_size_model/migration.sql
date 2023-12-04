/*
  Warnings:

  - You are about to drop the column `sizeId` on the `products` table. All the data in the column will be lost.
  - Added the required column `productId` to the `ProductSize` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_sizeId_fkey";

-- AlterTable
ALTER TABLE "ProductSize" ADD COLUMN     "productId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "sizeId";

-- AddForeignKey
ALTER TABLE "ProductSize" ADD CONSTRAINT "ProductSize_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
