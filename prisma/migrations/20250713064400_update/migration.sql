/*
  Warnings:

  - You are about to drop the column `paymentId` on the `ideas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ideas" DROP CONSTRAINT "ideas_paymentId_fkey";

-- AlterTable
ALTER TABLE "ideas" DROP COLUMN "paymentId";
