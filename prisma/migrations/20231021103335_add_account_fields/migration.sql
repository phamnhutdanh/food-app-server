/*
  Warnings:

  - Added the required column `idUserAccount` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUserAccount` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "idUserAccount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "idUserAccount" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_idUserAccount_fkey" FOREIGN KEY ("idUserAccount") REFERENCES "UserAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_idUserAccount_fkey" FOREIGN KEY ("idUserAccount") REFERENCES "UserAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
