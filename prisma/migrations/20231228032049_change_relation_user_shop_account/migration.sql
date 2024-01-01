/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `shops` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[accountId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `shops` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "shops" ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "shops_userId_key" ON "shops"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_accountId_key" ON "users"("accountId");
