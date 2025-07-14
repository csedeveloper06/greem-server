/*
  Warnings:

  - You are about to drop the column `ideaId` on the `payments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_ideaId_fkey";

-- AlterTable
ALTER TABLE "ideas" ADD COLUMN     "paymentId" TEXT;

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "ideaId",
ALTER COLUMN "status" SET DEFAULT 'UNPAID';

-- AddForeignKey
ALTER TABLE "ideas" ADD CONSTRAINT "ideas_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
