/*
  Warnings:

  - You are about to drop the column `shopId` on the `RatingProduct` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `RatingProduct` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `RatingProduct` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "RatingProduct" DROP CONSTRAINT "RatingProduct_shopId_fkey";

-- DropForeignKey
ALTER TABLE "RatingProduct" DROP CONSTRAINT "RatingProduct_userId_fkey";

-- AlterTable
ALTER TABLE "RatingProduct" DROP COLUMN "shopId",
ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RatingProduct_userId_key" ON "RatingProduct"("userId");

-- AddForeignKey
ALTER TABLE "RatingProduct" ADD CONSTRAINT "RatingProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
