/*
  Warnings:

  - You are about to drop the column `OrderStatus` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "OrderStatus",
ADD COLUMN     "orderStatus" "OrderStatus" NOT NULL DEFAULT 'PENDING';
