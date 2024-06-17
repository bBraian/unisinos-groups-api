/*
  Warnings:

  - You are about to drop the `RequestLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "RequestLog";

-- CreateTable
CREATE TABLE "logs" (
    "id" SERIAL NOT NULL,
    "ip" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);
