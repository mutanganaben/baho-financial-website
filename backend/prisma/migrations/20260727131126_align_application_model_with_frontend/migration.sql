/*
  Warnings:

  - You are about to drop the column `employmentStatus` on the `applications` table. All the data in the column will be lost.
  - You are about to drop the column `monthlyIncome` on the `applications` table. All the data in the column will be lost.
  - Added the required column `district` to the `applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loanPurpose` to the `applications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "applications" DROP COLUMN "employmentStatus",
DROP COLUMN "monthlyIncome",
ADD COLUMN     "district" TEXT NOT NULL,
ADD COLUMN     "loanPurpose" TEXT NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;
