/*
  Warnings:

  - You are about to drop the column `idUser` on the `shops` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "shops" DROP CONSTRAINT "shops_idUser_fkey";

-- AlterTable
ALTER TABLE "shops" DROP COLUMN "idUser",
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "shops" ADD CONSTRAINT "shops_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
