/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `AccountID` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `Balance` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `CreatedAt` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `CustomerID` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `UpdatedAt` on the `Account` table. All the data in the column will be lost.
  - The primary key for the `Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Address` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `CreatedAt` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `CustomerID` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `DateOfBirth` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `FullName` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `PhoneNumber` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `UpdatedAt` on the `Customer` table. All the data in the column will be lost.
  - The primary key for the `Transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `AccountID` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `Amount` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `Description` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `TransactionDate` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `TransactionID` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `TransactionType` on the `Transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionType` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_CustomerID_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_AccountID_fkey";

-- DropIndex
DROP INDEX "Customer_Email_key";

-- AlterTable
ALTER TABLE "Account" DROP CONSTRAINT "Account_pkey",
DROP COLUMN "AccountID",
DROP COLUMN "Balance",
DROP COLUMN "CreatedAt",
DROP COLUMN "CustomerID",
DROP COLUMN "UpdatedAt",
ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customerId" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_pkey",
DROP COLUMN "Address",
DROP COLUMN "CreatedAt",
DROP COLUMN "CustomerID",
DROP COLUMN "DateOfBirth",
DROP COLUMN "Email",
DROP COLUMN "FullName",
DROP COLUMN "PhoneNumber",
DROP COLUMN "UpdatedAt",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Customer_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_pkey",
DROP COLUMN "AccountID",
DROP COLUMN "Amount",
DROP COLUMN "Description",
DROP COLUMN "TransactionDate",
DROP COLUMN "TransactionID",
DROP COLUMN "TransactionType",
ADD COLUMN     "accountId" INTEGER NOT NULL,
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "transactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "transactionType" TEXT NOT NULL,
ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
