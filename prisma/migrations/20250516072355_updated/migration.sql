/*
  Warnings:

  - You are about to drop the `OrderIdeas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "OrderIdeas";

-- CreateTable
CREATE TABLE "order_ideas" (
    "orderId" TEXT NOT NULL,
    "ideaId" TEXT NOT NULL,

    CONSTRAINT "order_ideas_pkey" PRIMARY KEY ("orderId","ideaId")
);
