-- CreateEnum
CREATE TYPE "PlaceType" AS ENUM ('RESTAURANTE', 'BAR', 'HOTEL', 'PIZZARIA', 'ACAI', 'SORVETERIA');

-- CreateTable
CREATE TABLE "Place" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "PlaceType" NOT NULL,
    "phone" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "images" JSONB[],

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);
