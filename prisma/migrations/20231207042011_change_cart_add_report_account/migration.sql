/*
  Warnings:

  - You are about to drop the column `count` on the `cartProducts` table. All the data in the column will be lost.
  - You are about to drop the column `imageUri` on the `cartProducts` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `cartProducts` table. All the data in the column will be lost.
  - You are about to drop the column `shopId` on the `cartProducts` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `orderProducts` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `orderProducts` table. All the data in the column will be lost.
  - You are about to drop the column `shopId` on the `orderProducts` table. All the data in the column will be lost.
  - Added the required column `productSizeId` to the `cartProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullPrice` to the `orderProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productSizeId` to the `orderProducts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cartProducts" DROP CONSTRAINT "cartProducts_productId_fkey";

-- DropForeignKey
ALTER TABLE "cartProducts" DROP CONSTRAINT "cartProducts_shopId_fkey";

-- DropForeignKey
ALTER TABLE "orderProducts" DROP CONSTRAINT "orderProducts_productId_fkey";

-- DropForeignKey
ALTER TABLE "orderProducts" DROP CONSTRAINT "orderProducts_shopId_fkey";

-- DropIndex
DROP INDEX "productSubcategories_title_key";

-- AlterTable
ALTER TABLE "RatingProduct" ADD COLUMN     "comment" TEXT;

-- AlterTable
ALTER TABLE "RatingShop" ADD COLUMN     "comment" TEXT;

-- AlterTable
ALTER TABLE "cartProducts" DROP COLUMN "count",
DROP COLUMN "imageUri",
DROP COLUMN "productId",
DROP COLUMN "shopId",
ADD COLUMN     "amount" INTEGER DEFAULT 1,
ADD COLUMN     "productSizeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orderProducts" DROP COLUMN "price",
DROP COLUMN "productId",
DROP COLUMN "shopId",
ADD COLUMN     "fullPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "productSizeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ReportAccount" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reporterId" TEXT NOT NULL,

    CONSTRAINT "ReportAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportAccountDetail" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "accountId" TEXT NOT NULL,
    "reportAccountId" TEXT NOT NULL,

    CONSTRAINT "ReportAccountDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cartProducts" ADD CONSTRAINT "cartProducts_productSizeId_fkey" FOREIGN KEY ("productSizeId") REFERENCES "ProductSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderProducts" ADD CONSTRAINT "orderProducts_productSizeId_fkey" FOREIGN KEY ("productSizeId") REFERENCES "ProductSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportAccount" ADD CONSTRAINT "ReportAccount_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportAccountDetail" ADD CONSTRAINT "ReportAccountDetail_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportAccountDetail" ADD CONSTRAINT "ReportAccountDetail_reportAccountId_fkey" FOREIGN KEY ("reportAccountId") REFERENCES "ReportAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
