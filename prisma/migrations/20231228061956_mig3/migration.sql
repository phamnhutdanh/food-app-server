-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('DONE', 'READ', 'UN_READ');

-- AlterTable
ALTER TABLE "ReportAccount" ADD COLUMN     "mark" "ReportStatus" DEFAULT 'UN_READ';
