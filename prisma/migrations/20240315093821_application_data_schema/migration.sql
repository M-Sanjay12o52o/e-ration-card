/*
  Warnings:

  - You are about to drop the column `applications` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "applications";

-- CreateTable
CREATE TABLE "ApplicationData" (
    "id" TEXT NOT NULL,
    "formData" JSONB NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ApplicationData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ApplicationData" ADD CONSTRAINT "ApplicationData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
