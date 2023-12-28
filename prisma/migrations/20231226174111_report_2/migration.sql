/*
  Warnings:

  - You are about to drop the column `accountRepotedId` on the `ReportAccount` table. All the data in the column will be lost.
  - Added the required column `accountReportedId` to the `ReportAccount` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ReportAccount" DROP CONSTRAINT "ReportAccount_accountRepotedId_fkey";

-- AlterTable
ALTER TABLE "ReportAccount" DROP COLUMN "accountRepotedId",
ADD COLUMN     "accountReportedId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ReportAccount" ADD CONSTRAINT "ReportAccount_accountReportedId_fkey" FOREIGN KEY ("accountReportedId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
