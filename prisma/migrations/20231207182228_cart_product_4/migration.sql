/*
  Warnings:

  - The primary key for the `cartProducts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `cartProducts` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "cartProducts_productSizeId_cartId_key";

-- DropIndex
DROP INDEX "orderProducts_orderId_productSizeId_key";

-- AlterTable
ALTER TABLE "cartProducts" DROP CONSTRAINT "cartProducts_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "cartProducts_pkey" PRIMARY KEY ("id");
