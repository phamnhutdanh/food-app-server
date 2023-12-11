/*
  Warnings:

  - A unique constraint covering the columns `[productSizeId,cartId]` on the table `cartProducts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderId,productSizeId]` on the table `orderProducts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "cartProducts_productSizeId_cartId_key" ON "cartProducts"("productSizeId", "cartId");

-- CreateIndex
CREATE UNIQUE INDEX "orderProducts_orderId_productSizeId_key" ON "orderProducts"("orderId", "productSizeId");
