import { prisma } from "@/lib/prisma";


export async function obtenerArticulos()
{
    const articulos = await prisma.producto.findMany();
    return articulos;
}