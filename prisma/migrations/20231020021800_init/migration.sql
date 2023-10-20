-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CUSTOMER', 'SHOP');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHERS');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'CANCEL', 'ACCEPT', 'COMPLETE');

-- CreateTable
CREATE TABLE "UserAccount" (
    "id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "hashPassword" TEXT NOT NULL,
    "saltPassword" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CUSTOMER',

    CONSTRAINT "UserAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,
    "phoneNumber" TEXT,
    "defaultAddress" TEXT,
    "gender" "Gender" DEFAULT 'OTHERS',
    "birthday" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "idCustomer" INTEGER NOT NULL,
    "idFood" INTEGER NOT NULL,
    "idShop" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("idFood","idCustomer","idShop")
);

-- CreateTable
CREATE TABLE "Shop" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,
    "backgroundImageUrl" TEXT,
    "phoneNumber" TEXT,
    "defaultAddress" TEXT,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Food" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,
    "description" TEXT,
    "price" BIGINT NOT NULL,
    "idFoodType" INTEGER,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodType" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "FoodType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodSize" (
    "id" SERIAL NOT NULL,
    "size" TEXT NOT NULL,

    CONSTRAINT "FoodSize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "sellCount" INTEGER NOT NULL,
    "dateAdded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idShop" INTEGER NOT NULL,
    "idFood" INTEGER NOT NULL,
    "idFoodSize" INTEGER NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "orderStatus" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timeDeliveryToCustomer" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "totalCost" BIGINT NOT NULL,
    "noteFromShop" TEXT,
    "idCustomer" INTEGER NOT NULL,
    "idShop" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderDetails" (
    "quantity" INTEGER NOT NULL,
    "idOrder" INTEGER NOT NULL,
    "idFood" INTEGER NOT NULL,

    CONSTRAINT "OrderDetails_pkey" PRIMARY KEY ("idFood","idOrder")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAccount_email_key" ON "UserAccount"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FoodType_type_key" ON "FoodType"("type");

-- CreateIndex
CREATE UNIQUE INDEX "FoodSize_size_key" ON "FoodSize"("size");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_idCustomer_fkey" FOREIGN KEY ("idCustomer") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_idFood_fkey" FOREIGN KEY ("idFood") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_idShop_fkey" FOREIGN KEY ("idShop") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_idFoodType_fkey" FOREIGN KEY ("idFoodType") REFERENCES "FoodType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_idShop_fkey" FOREIGN KEY ("idShop") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_idFood_fkey" FOREIGN KEY ("idFood") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_idFoodSize_fkey" FOREIGN KEY ("idFoodSize") REFERENCES "FoodSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_idCustomer_fkey" FOREIGN KEY ("idCustomer") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_idShop_fkey" FOREIGN KEY ("idShop") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetails" ADD CONSTRAINT "OrderDetails_idOrder_fkey" FOREIGN KEY ("idOrder") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetails" ADD CONSTRAINT "OrderDetails_idFood_fkey" FOREIGN KEY ("idFood") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
