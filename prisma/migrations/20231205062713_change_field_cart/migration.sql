-- DropIndex
DROP INDEX "cartProducts_title_key";

-- AlterTable
ALTER TABLE "cartProducts" ALTER COLUMN "fullPrice" DROP NOT NULL,
ALTER COLUMN "fullPrice" SET DEFAULT 0;
