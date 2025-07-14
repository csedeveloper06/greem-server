-- AlterEnum
ALTER TYPE "PaymentStatus" ADD VALUE 'UNPAID';

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "paymentStatus" SET DEFAULT 'PAID';

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
