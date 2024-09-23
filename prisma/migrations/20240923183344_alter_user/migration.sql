/*
  Warnings:

  - You are about to drop the column `date_of_birtha` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "date_of_birtha",
ADD COLUMN     "date_of_birth" TIMESTAMP(3);
