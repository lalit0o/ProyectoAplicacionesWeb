/*
  Warnings:

  - Added the required column `categoria` to the `materiales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoria` to the `productos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "materiales" ADD COLUMN     "categoria" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "productos" ADD COLUMN     "categoria" TEXT NOT NULL;
