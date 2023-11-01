/*
  Warnings:

  - You are about to drop the column `hashPassword` on the `UserAccount` table. All the data in the column will be lost.
  - You are about to drop the column `saltPassword` on the `UserAccount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserAccount" DROP COLUMN "hashPassword",
DROP COLUMN "saltPassword";
