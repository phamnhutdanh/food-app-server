/*
  Warnings:

  - Made the column `userId` on table `RatingProduct` required. This step will fail if there are existing NULL values in that column.
  - Made the column `productId` on table `RatingProduct` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `RatingShop` required. This step will fail if there are existing NULL values in that column.
  - Made the column `shopId` on table `RatingShop` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "RatingProduct" DROP CONSTRAINT "RatingProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "RatingProduct" DROP CONSTRAINT "RatingProduct_userId_fkey";

-- DropForeignKey
ALTER TABLE "RatingShop" DROP CONSTRAINT "RatingShop_shopId_fkey";

-- DropForeignKey
ALTER TABLE "RatingShop" DROP CONSTRAINT "RatingShop_userId_fkey";

-- AlterTable
ALTER TABLE "RatingProduct" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "productId" SET NOT NULL,
ALTER COLUMN "comment" SET DEFAULT '';

-- AlterTable
ALTER TABLE "RatingShop" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "shopId" SET NOT NULL,
ALTER COLUMN "comment" SET DEFAULT '';

-- AlterTable
ALTER TABLE "cartProducts" ALTER COLUMN "title" SET DEFAULT '';

-- AlterTable
ALTER TABLE "orderProducts" ALTER COLUMN "title" SET DEFAULT '';

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "commentary" SET DEFAULT '';

-- AlterTable
ALTER TABLE "shops" ALTER COLUMN "shopAddress" SET DEFAULT '',
ALTER COLUMN "shopPhoneNumber" SET DEFAULT '',
ALTER COLUMN "shopName" SET DEFAULT '',
ALTER COLUMN "imageUri" SET DEFAULT '';

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "phoneNumber" SET DEFAULT '',
ALTER COLUMN "defaultAddress" SET DEFAULT '';

-- AddForeignKey
ALTER TABLE "RatingProduct" ADD CONSTRAINT "RatingProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingProduct" ADD CONSTRAINT "RatingProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingShop" ADD CONSTRAINT "RatingShop_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingShop" ADD CONSTRAINT "RatingShop_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
