/*
  Warnings:

  - You are about to drop the `RatingShop` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RatingShop" DROP CONSTRAINT "RatingShop_shopId_fkey";

-- DropForeignKey
ALTER TABLE "RatingShop" DROP CONSTRAINT "RatingShop_userId_fkey";

-- DropTable
DROP TABLE "RatingShop";
