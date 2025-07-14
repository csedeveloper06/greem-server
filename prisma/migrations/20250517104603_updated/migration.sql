/*
  Warnings:

  - Added the required column `paymentStatus` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ideas" ALTER COLUMN "isPaid" SET DEFAULT false,
ALTER COLUMN "paymentStatus" SET DEFAULT 'FREE';

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL;
