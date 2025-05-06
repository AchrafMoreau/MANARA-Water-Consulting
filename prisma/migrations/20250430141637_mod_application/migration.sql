/*
  Warnings:

  - You are about to drop the column `position` on the `Application` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'REVIEWED', 'REJECTED');

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "position",
ADD COLUMN     "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING';
