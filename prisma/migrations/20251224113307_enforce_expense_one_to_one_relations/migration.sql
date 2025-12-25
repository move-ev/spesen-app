/*
  Warnings:

  - You are about to drop the `Attachment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Expense` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MealExpense` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReceiptExpensee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TravelExpense` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `account` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_receiptExpenseId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_costAccountId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_reportId_fkey";

-- DropForeignKey
ALTER TABLE "MealExpense" DROP CONSTRAINT "MealExpense_expenseId_fkey";

-- DropForeignKey
ALTER TABLE "ReceiptExpensee" DROP CONSTRAINT "ReceiptExpensee_expenseId_fkey";

-- DropForeignKey
ALTER TABLE "TravelExpense" DROP CONSTRAINT "TravelExpense_expenseId_fkey";

-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_userId_fkey";

-- DropTable
DROP TABLE "Attachment";

-- DropTable
DROP TABLE "Expense";

-- DropTable
DROP TABLE "MealExpense";

-- DropTable
DROP TABLE "ReceiptExpensee";

-- DropTable
DROP TABLE "TravelExpense";

-- DropTable
DROP TABLE "account";

-- CreateTable
CREATE TABLE "expense" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "type" "ExpenseType" NOT NULL,
    "reasoning" TEXT,
    "reportId" TEXT NOT NULL,
    "costAccountId" TEXT NOT NULL,

    CONSTRAINT "expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "receipt_expense" (
    "id" TEXT NOT NULL,
    "expenseId" TEXT NOT NULL,

    CONSTRAINT "receipt_expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attachment" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "receiptExpenseId" TEXT NOT NULL,

    CONSTRAINT "attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "travel_expense" (
    "id" TEXT NOT NULL,
    "expenseId" TEXT NOT NULL,
    "startPoint" TEXT NOT NULL,
    "endPoint" TEXT NOT NULL,
    "distance" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "travel_expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meal_expense" (
    "id" TEXT NOT NULL,
    "expenseId" TEXT NOT NULL,
    "discountBreakfast" INTEGER NOT NULL,
    "discountLunch" INTEGER NOT NULL,
    "discountDinner" INTEGER NOT NULL,

    CONSTRAINT "meal_expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "receipt_expense_expenseId_key" ON "receipt_expense"("expenseId");

-- CreateIndex
CREATE UNIQUE INDEX "travel_expense_expenseId_key" ON "travel_expense"("expenseId");

-- CreateIndex
CREATE UNIQUE INDEX "meal_expense_expenseId_key" ON "meal_expense"("expenseId");

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_costAccountId_fkey" FOREIGN KEY ("costAccountId") REFERENCES "cost_account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt_expense" ADD CONSTRAINT "receipt_expense_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "expense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachment" ADD CONSTRAINT "attachment_receiptExpenseId_fkey" FOREIGN KEY ("receiptExpenseId") REFERENCES "receipt_expense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travel_expense" ADD CONSTRAINT "travel_expense_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "expense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_expense" ADD CONSTRAINT "meal_expense_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "expense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
