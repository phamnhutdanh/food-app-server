/*
  Warnings:

  - The primary key for the `RatingProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `RatingProduct` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RatingProduct" DROP CONSTRAINT "RatingProduct_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "RatingProduct_pkey" PRIMARY KEY ("userId", "productId");
