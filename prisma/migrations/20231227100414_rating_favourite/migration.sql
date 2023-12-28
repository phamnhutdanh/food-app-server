/*
  Warnings:

  - The primary key for the `FavouriteProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `FavouriteProduct` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "RatingProduct_userId_key";

-- AlterTable
ALTER TABLE "FavouriteProduct" DROP CONSTRAINT "FavouriteProduct_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "FavouriteProduct_pkey" PRIMARY KEY ("userId", "productId");
