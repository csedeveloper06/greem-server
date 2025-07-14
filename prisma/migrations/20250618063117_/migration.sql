/*
  Warnings:

  - You are about to drop the column `status` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "status",
ADD COLUMN     "orderStatus" "OrderStatus" NOT NULL DEFAULT 'PENDING';
