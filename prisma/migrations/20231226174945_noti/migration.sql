/*
  Warnings:

  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_toShopId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_toUserId_fkey";

-- DropTable
DROP TABLE "Notification";

-- CreateTable
CREATE TABLE "NotificationAccount" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "toUserId" TEXT,
    "toShopId" TEXT,

    CONSTRAINT "NotificationAccount_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NotificationAccount" ADD CONSTRAINT "NotificationAccount_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationAccount" ADD CONSTRAINT "NotificationAccount_toShopId_fkey" FOREIGN KEY ("toShopId") REFERENCES "shops"("id") ON DELETE CASCADE ON UPDATE CASCADE;
