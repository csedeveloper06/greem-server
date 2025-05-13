/*
  Warnings:

  - Added the required column `solution` to the `ideas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statement` to the `ideas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ideas" ADD COLUMN     "solution" TEXT NOT NULL,
ADD COLUMN     "statement" TEXT NOT NULL;
