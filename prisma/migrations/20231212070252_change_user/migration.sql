-- AlterTable
ALTER TABLE "users" ADD COLUMN     "loginAs" "UserRole" DEFAULT 'USER';

-- CreateTable
CREATE TABLE "FavouriteProduct" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "FavouriteProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FavouriteProduct" ADD CONSTRAINT "FavouriteProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavouriteProduct" ADD CONSTRAINT "FavouriteProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
