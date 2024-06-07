/*
  Warnings:

  - Added the required column `type` to the `links` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "links" ADD COLUMN     "prSubjectId" INTEGER,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "subjects" ALTER COLUMN "image" DROP NOT NULL;

-- CreateTable
CREATE TABLE "pr_subjects" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "status" TEXT NOT NULL,
    "course_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pr_subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pr_links" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "pr_subject_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pr_links_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pr_subjects" ADD CONSTRAINT "pr_subjects_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pr_links" ADD CONSTRAINT "pr_links_pr_subject_id_fkey" FOREIGN KEY ("pr_subject_id") REFERENCES "pr_subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
