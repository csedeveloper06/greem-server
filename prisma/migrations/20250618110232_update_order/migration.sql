/*
  Warnings:

  - You are about to drop the column `paymentStatus` on the `ideas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ideas" DROP COLUMN "paymentStatus";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'UNPAID';
