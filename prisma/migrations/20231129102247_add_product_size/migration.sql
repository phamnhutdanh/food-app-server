/*
  Warnings:

  - You are about to drop the column `size` on the `products` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "products_size_key";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "size";

-- CreateTable
CREATE TABLE "ProductSize" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "ProductSize_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductSize" ADD CONSTRAINT "ProductSize_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
