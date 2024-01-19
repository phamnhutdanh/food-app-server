-- CreateTable
CREATE TABLE "OrderIngredientDetail" (
    "id" TEXT NOT NULL,
    "title" TEXT DEFAULT '',
    "productIngredientID" TEXT NOT NULL,
    "orderProductId" TEXT NOT NULL,

    CONSTRAINT "OrderIngredientDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductIngredients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUri" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductIngredients_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderIngredientDetail" ADD CONSTRAINT "OrderIngredientDetail_productIngredientID_fkey" FOREIGN KEY ("productIngredientID") REFERENCES "ProductIngredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderIngredientDetail" ADD CONSTRAINT "OrderIngredientDetail_orderProductId_fkey" FOREIGN KEY ("orderProductId") REFERENCES "orderProducts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductIngredients" ADD CONSTRAINT "ProductIngredients_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
