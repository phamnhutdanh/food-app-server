-- CreateTable
CREATE TABLE "CartIngredientDetail" (
    "id" TEXT NOT NULL,
    "title" TEXT DEFAULT '',
    "productIngredientID" TEXT NOT NULL,
    "cartProductId" TEXT NOT NULL,

    CONSTRAINT "CartIngredientDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CartIngredientDetail" ADD CONSTRAINT "CartIngredientDetail_productIngredientID_fkey" FOREIGN KEY ("productIngredientID") REFERENCES "ProductIngredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartIngredientDetail" ADD CONSTRAINT "CartIngredientDetail_cartProductId_fkey" FOREIGN KEY ("cartProductId") REFERENCES "cartProducts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
