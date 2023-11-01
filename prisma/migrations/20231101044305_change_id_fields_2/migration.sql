/*
  Warnings:

  - The primary key for the `Cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Customer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Shop` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Shop` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `idCustomer` on the `Cart` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `idShop` on the `Cart` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `idShop` on the `Category` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `idCustomer` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `idShop` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_idCustomer_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_idShop_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_idShop_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_idCustomer_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_idShop_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_pkey",
DROP COLUMN "idCustomer",
ADD COLUMN     "idCustomer" INTEGER NOT NULL,
DROP COLUMN "idShop",
ADD COLUMN     "idShop" INTEGER NOT NULL,
ADD CONSTRAINT "Cart_pkey" PRIMARY KEY ("idFood", "idCustomer", "idShop");

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "idShop",
ADD COLUMN     "idShop" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Customer_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "idCustomer",
ADD COLUMN     "idCustomer" INTEGER NOT NULL,
DROP COLUMN "idShop",
ADD COLUMN     "idShop" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Shop_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_idCustomer_fkey" FOREIGN KEY ("idCustomer") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_idShop_fkey" FOREIGN KEY ("idShop") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_idShop_fkey" FOREIGN KEY ("idShop") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_idCustomer_fkey" FOREIGN KEY ("idCustomer") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_idShop_fkey" FOREIGN KEY ("idShop") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
