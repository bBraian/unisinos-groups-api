-- AlterTable
ALTER TABLE "pr_links" ADD COLUMN     "subject_id" INTEGER,
ALTER COLUMN "pr_subject_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "pr_subjects" ADD COLUMN     "subject_id" INTEGER;
