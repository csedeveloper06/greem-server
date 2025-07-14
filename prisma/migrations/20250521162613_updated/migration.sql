-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "paymentStatus" SET DEFAULT 'UNPAID';

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;
