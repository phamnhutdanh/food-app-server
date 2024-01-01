-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('BANNED', 'NONE', 'WARNING');

-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "status" "AccountStatus" DEFAULT 'NONE';
