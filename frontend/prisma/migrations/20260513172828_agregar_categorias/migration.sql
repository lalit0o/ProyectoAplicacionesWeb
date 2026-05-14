/*
  Warnings:

  - You are about to drop the column `stock` on the `materiales` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "materiales" DROP COLUMN "stock",
ADD COLUMN     "categoriaId" INTEGER;

-- AlterTable
ALTER TABLE "productos" ADD COLUMN     "categoriaId" INTEGER;

-- CreateTable
CREATE TABLE "categorias_productos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "categorias_productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias_materiales" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "categorias_materiales_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categorias_productos_nombre_key" ON "categorias_productos"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_materiales_nombre_key" ON "categorias_materiales"("nombre");

-- AddForeignKey
ALTER TABLE "productos" ADD CONSTRAINT "productos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias_productos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "materiales" ADD CONSTRAINT "materiales_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias_materiales"("id") ON DELETE SET NULL ON UPDATE CASCADE;
