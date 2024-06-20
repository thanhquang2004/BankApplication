-- CreateTable
CREATE TABLE "Customer" (
    "CustomerID" SERIAL NOT NULL,
    "FullName" TEXT NOT NULL,
    "DateOfBirth" TIMESTAMP(3),
    "Email" TEXT NOT NULL,
    "PhoneNumber" TEXT,
    "Address" TEXT,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("CustomerID")
);

-- CreateTable
CREATE TABLE "Account" (
    "AccountID" SERIAL NOT NULL,
    "CustomerID" INTEGER NOT NULL,
    "AccountType" TEXT NOT NULL,
    "Balance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("AccountID")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "TransactionID" SERIAL NOT NULL,
    "AccountID" INTEGER NOT NULL,
    "Amount" DOUBLE PRECISION NOT NULL,
    "TransactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Description" TEXT,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("TransactionID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_Email_key" ON "Customer"("Email");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_CustomerID_fkey" FOREIGN KEY ("CustomerID") REFERENCES "Customer"("CustomerID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_AccountID_fkey" FOREIGN KEY ("AccountID") REFERENCES "Account"("AccountID") ON DELETE RESTRICT ON UPDATE CASCADE;
