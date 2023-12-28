/*
  Warnings:

  - A unique constraint covering the columns `[reportAccountId]` on the table `ReportAccountDetail` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ReportAccountDetail_reportAccountId_key" ON "ReportAccountDetail"("reportAccountId");
