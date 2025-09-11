/*
  Warnings:

  - You are about to drop the column `material_price` on the `Orders` table. All the data in the column will be lost.
  - Added the required column `material` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "material_price",
ADD COLUMN     "material" DECIMAL(19,4) NOT NULL;
