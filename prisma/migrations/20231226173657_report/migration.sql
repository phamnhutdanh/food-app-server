/*
  Warnings:

  - You are about to drop the column `reporterId` on the `ReportAccount` table. All the data in the column will be lost.
  - You are about to drop the column `accountId` on the `ReportAccountDetail` table. All the data in the column will be lost.
  - Added the required column `accountRepotedId` to the `ReportAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reporterId` to the `ReportAccountDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ReportAccount" DROP CONSTRAINT "ReportAccount_reporterId_fkey";

-- DropForeignKey
ALTER TABLE "ReportAccountDetail" DROP CONSTRAINT "ReportAccountDetail_accountId_fkey";

-- AlterTable
ALTER TABLE "ReportAccount" DROP COLUMN "reporterId",
ADD COLUMN     "accountRepotedId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ReportAccountDetail" DROP COLUMN "accountId",
ADD COLUMN     "reporterId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ReportAccount" ADD CONSTRAINT "ReportAccount_accountRepotedId_fkey" FOREIGN KEY ("accountRepotedId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportAccountDetail" ADD CONSTRAINT "ReportAccountDetail_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
