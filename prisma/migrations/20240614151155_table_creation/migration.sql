/*
  Warnings:

  - You are about to drop the column `AccountType` on the `Account` table. All the data in the column will be lost.
  - Added the required column `TransactionType` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "AccountType";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "TransactionType" TEXT NOT NULL;
