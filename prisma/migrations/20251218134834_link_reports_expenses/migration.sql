/*
  Warnings:

  - Added the required column `reportId` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "reportId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
