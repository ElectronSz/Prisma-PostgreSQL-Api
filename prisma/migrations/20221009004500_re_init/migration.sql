/*
  Warnings:

  - You are about to drop the column `authorId` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `password` to the `Permission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_authorId_fkey";

-- AlterTable
ALTER TABLE "Permission" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "authorId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
