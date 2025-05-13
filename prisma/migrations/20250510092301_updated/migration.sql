/*
  Warnings:

  - The values [TRANSPORT] on the enum `CategoryStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CategoryStatus_new" AS ENUM ('WASTE', 'TRANSPORTATION', 'ENERGY');
ALTER TABLE "categories" ALTER COLUMN "categoryStatus" TYPE "CategoryStatus_new" USING ("categoryStatus"::text::"CategoryStatus_new");
ALTER TYPE "CategoryStatus" RENAME TO "CategoryStatus_old";
ALTER TYPE "CategoryStatus_new" RENAME TO "CategoryStatus";
DROP TYPE "CategoryStatus_old";
COMMIT;
