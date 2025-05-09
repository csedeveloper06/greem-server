-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "categoryStatus" "CategoryStatus" NOT NULL,
    "icon" TEXT,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);
