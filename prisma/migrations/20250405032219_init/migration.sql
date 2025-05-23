/*
  Warnings:

  - You are about to drop the column `emailAddress` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nameuser` on the `User` table. All the data in the column will be lost.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_nameuser_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailAddress",
DROP COLUMN "nameuser",
ADD COLUMN     "email" TEXT NOT NULL;
