/*
  Warnings:

  - You are about to drop the column `imageUri` on the `orderProducts` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `orderProducts` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `orderProducts` table. All the data in the column will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `deliveredAt` to the `orderProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryAddress` to the `orderProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalCost` to the `orderProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `orderProducts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orderProducts" DROP CONSTRAINT "orderProducts_orderId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_userId_fkey";

-- AlterTable
ALTER TABLE "orderProducts" DROP COLUMN "imageUri",
DROP COLUMN "orderId",
DROP COLUMN "title",
ADD COLUMN     "commentary" TEXT DEFAULT '',
ADD COLUMN     "deliveredAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "deliveryAddress" TEXT NOT NULL,
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "totalCost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "orders";

-- AddForeignKey
ALTER TABLE "orderProducts" ADD CONSTRAINT "orderProducts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
