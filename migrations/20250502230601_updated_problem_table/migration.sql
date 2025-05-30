/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Problem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Problem_id_key" ON "Problem"("id");
