/*
  Warnings:

  - You are about to drop the column `studentId` on the `book` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Book` DROP FOREIGN KEY `Book_studentId_fkey`;

-- DropIndex
DROP INDEX `Book_studentId_fkey` ON `Book`;

-- AlterTable
ALTER TABLE `Book` DROP COLUMN `studentId`;
