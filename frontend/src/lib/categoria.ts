import { prisma } from "@/lib/prisma"

export async function obtenerCategorias() {
    const categorias = await prisma.categoriaProducto.findMany({
        where: {
            productos: {
                some: {
                    enStock: true
                }
            }
        },
        orderBy: { nombre: "asc" }
    })

    return categorias
}