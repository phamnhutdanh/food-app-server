/*
  Warnings:

  - The primary key for the `Cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Shop` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserAccount` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_idCustomer_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_idShop_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_idShop_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_idUserAccount_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_idCustomer_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_idShop_fkey";

-- DropForeignKey
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_idUserAccount_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_pkey",
ALTER COLUMN "idCustomer" SET DATA TYPE TEXT,
ALTER COLUMN "idShop" SET DATA TYPE TEXT,
ADD CONSTRAINT "Cart_pkey" PRIMARY KEY ("idFood", "idCustomer", "idShop");

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "idShop" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "idUserAccount" SET DATA TYPE TEXT,
ADD CONSTRAINT "Customer_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "idCustomer" SET DATA TYPE TEXT,
ALTER COLUMN "idShop" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "idUserAccount" SET DATA TYPE TEXT,
ADD CONSTRAINT "Shop_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserAccount" DROP CONSTRAINT "UserAccount_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserAccount_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_idUserAccount_fkey" FOREIGN KEY ("idUserAccount") REFERENCES "UserAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_idCustomer_fkey" FOREIGN KEY ("idCustomer") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_idShop_fkey" FOREIGN KEY ("idShop") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_idUserAccount_fkey" FOREIGN KEY ("idUserAccount") REFERENCES "UserAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_idShop_fkey" FOREIGN KEY ("idShop") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_idCustomer_fkey" FOREIGN KEY ("idCustomer") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_idShop_fkey" FOREIGN KEY ("idShop") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
