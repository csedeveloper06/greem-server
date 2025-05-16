-- CreateTable
CREATE TABLE "OrderIdeas" (
    "orderId" TEXT NOT NULL,
    "ideaId" TEXT NOT NULL,

    CONSTRAINT "OrderIdeas_pkey" PRIMARY KEY ("orderId","ideaId")
);
