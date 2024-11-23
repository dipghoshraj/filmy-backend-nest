/*
  Warnings:

  - You are about to drop the column `file_path` on the `ImageMetadata` table. All the data in the column will be lost.
  - Added the required column `file_bucket` to the `ImageMetadata` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ImageMetadata" DROP COLUMN "file_path",
ADD COLUMN     "etag" TEXT,
ADD COLUMN     "extension" TEXT,
ADD COLUMN     "file_bucket" TEXT NOT NULL,
ADD COLUMN     "size" INTEGER,
ADD COLUMN     "version" TEXT;
