/*
  Warnings:

  - Added the required column `templateId` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `resume` ADD COLUMN `templateId` VARCHAR(191) NOT NULL;
