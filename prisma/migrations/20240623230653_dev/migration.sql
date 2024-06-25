/*
  Warnings:

  - You are about to drop the column `status` on the `pr_links` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `pr_subjects` table. All the data in the column will be lost.
  - Added the required column `pull_request_id` to the `pr_links` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pull_request_id` to the `pr_subjects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pr_links" DROP COLUMN "status",
ADD COLUMN     "pull_request_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "pr_subjects" DROP COLUMN "status",
ADD COLUMN     "pull_request_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "pull_requests" (
    "id" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pull_requests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pr_subjects" ADD CONSTRAINT "pr_subjects_pull_request_id_fkey" FOREIGN KEY ("pull_request_id") REFERENCES "pull_requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pr_links" ADD CONSTRAINT "pr_links_pull_request_id_fkey" FOREIGN KEY ("pull_request_id") REFERENCES "pull_requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
