/*
  Warnings:

  - The primary key for the `cartProducts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `cartProducts` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "cartProducts_productSizeId_cartId_key";

-- AlterTable
ALTER TABLE "cartProducts" DROP CONSTRAINT "cartProducts_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "cartProducts_pkey" PRIMARY KEY ("productSizeId", "cartId");
