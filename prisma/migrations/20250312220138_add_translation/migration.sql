-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "translations" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "translations" JSONB NOT NULL DEFAULT '{}';
