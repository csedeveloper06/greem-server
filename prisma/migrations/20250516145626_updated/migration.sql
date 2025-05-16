/*
  Warnings:

  - A unique constraint covering the columns `[categoryStatus]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "categories_categoryStatus_key" ON "categories"("categoryStatus");
