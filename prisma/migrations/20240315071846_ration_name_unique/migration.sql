/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Ration` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Ration_name_key" ON "Ration"("name");
