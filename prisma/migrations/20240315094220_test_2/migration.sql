/*
  Warnings:

  - You are about to drop the column `formData` on the `ApplicationData` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ApplicationData` table. All the data in the column will be lost.
  - Added the required column `address` to the `ApplicationData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age` to the `ApplicationData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emai` to the `ApplicationData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `familyCount` to the `ApplicationData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `ApplicationData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `ApplicationData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `ApplicationData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `ApplicationData` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ApplicationData" DROP CONSTRAINT "ApplicationData_userId_fkey";

-- AlterTable
ALTER TABLE "ApplicationData" DROP COLUMN "formData",
DROP COLUMN "userId",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "age" TEXT NOT NULL,
ADD COLUMN     "applicationId" TEXT,
ADD COLUMN     "emai" TEXT NOT NULL,
ADD COLUMN     "familyCount" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "number" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationData" ADD CONSTRAINT "ApplicationData_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;
