-- DropForeignKey
ALTER TABLE "RatingProduct" DROP CONSTRAINT "RatingProduct_userId_fkey";

-- DropForeignKey
ALTER TABLE "ReportAccount" DROP CONSTRAINT "ReportAccount_accountReportedId_fkey";

-- DropForeignKey
ALTER TABLE "ReportAccountDetail" DROP CONSTRAINT "ReportAccountDetail_reportAccountId_fkey";

-- DropForeignKey
ALTER TABLE "ReportAccountDetail" DROP CONSTRAINT "ReportAccountDetail_reporterId_fkey";

-- DropForeignKey
ALTER TABLE "cartProducts" DROP CONSTRAINT "cartProducts_productSizeId_fkey";

-- DropForeignKey
ALTER TABLE "orderProducts" DROP CONSTRAINT "orderProducts_productSizeId_fkey";

-- AddForeignKey
ALTER TABLE "cartProducts" ADD CONSTRAINT "cartProducts_productSizeId_fkey" FOREIGN KEY ("productSizeId") REFERENCES "ProductSize"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderProducts" ADD CONSTRAINT "orderProducts_productSizeId_fkey" FOREIGN KEY ("productSizeId") REFERENCES "ProductSize"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingProduct" ADD CONSTRAINT "RatingProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportAccount" ADD CONSTRAINT "ReportAccount_accountReportedId_fkey" FOREIGN KEY ("accountReportedId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportAccountDetail" ADD CONSTRAINT "ReportAccountDetail_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportAccountDetail" ADD CONSTRAINT "ReportAccountDetail_reportAccountId_fkey" FOREIGN KEY ("reportAccountId") REFERENCES "ReportAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
