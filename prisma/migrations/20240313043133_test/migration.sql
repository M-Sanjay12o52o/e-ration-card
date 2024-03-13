/*
  Warnings:

  - Changed the type of `quantity` on the `Ration` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Ration" DROP COLUMN "quantity",
ADD COLUMN     "quantity" INTEGER NOT NULL,
ALTER COLUMN "hubIds" DROP NOT NULL,
ALTER COLUMN "hubIds" SET DATA TYPE TEXT;
