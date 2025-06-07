/*
  Warnings:

  - A unique constraint covering the columns `[sessionId]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Purchase_sessionId_key" ON "Purchase"("sessionId");
