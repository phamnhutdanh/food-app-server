/*
  Warnings:

  - A unique constraint covering the columns `[userId,productId]` on the table `FavouriteProduct` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,productId]` on the table `RatingProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FavouriteProduct_userId_productId_key" ON "FavouriteProduct"("userId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "RatingProduct_userId_productId_key" ON "RatingProduct"("userId", "productId");
