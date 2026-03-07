-- AlterTable
ALTER TABLE `book` ADD COLUMN `studentId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
