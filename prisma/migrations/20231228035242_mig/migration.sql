-- CreateEnum
CREATE TYPE "NotiStatus" AS ENUM ('READ', 'UN_READ');

-- AlterTable
ALTER TABLE "NotificationAccount" ADD COLUMN     "status" "NotiStatus" DEFAULT 'UN_READ';
