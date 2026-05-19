import { prisma } from "@/lib/prisma";

export async function obtenerCategorias()
{
    const categorias = await prisma.categoriaProducto.findMany();
    return categorias;
}