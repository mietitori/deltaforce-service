/*
  Warnings:

  - Added the required column `telegramUserId` to the `members` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "members" ADD COLUMN     "telegramUserId" VARCHAR(300) NOT NULL;
