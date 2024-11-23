/*
  Warnings:

  - A unique constraint covering the columns `[image_matadata_id]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image_matadata_id` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "image_matadata_id" INTEGER NOT NULL,
ADD COLUMN     "post_id" INTEGER,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ImageMetadata" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "upload_time" TIMESTAMP(3),
    "image_id" INTEGER NOT NULL,

    CONSTRAINT "ImageMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_image_matadata_id_key" ON "Image"("image_matadata_id");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_image_matadata_id_fkey" FOREIGN KEY ("image_matadata_id") REFERENCES "ImageMetadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
