-- CreateEnum
CREATE TYPE "userType" AS ENUM ('director', 'admin', 'managedUser', 'normUser');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "usertype" "userType"[];
