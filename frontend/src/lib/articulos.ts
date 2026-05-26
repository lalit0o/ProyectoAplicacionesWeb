import { prisma } from "@/lib/prisma"

interface ArticuloType {
    id: number
    titulo: string
    precio: number
    imagenUrl?: string
    enStock: boolean
    categoria?: string
    categoriaId?: number
}

export async function obtenerArticulos(categoria: string): Promise<ArticuloType[]> {
    try {
        const productos = await prisma.producto.findMany({
            where: {
                enStock: true,
                activo: true,
                ...(categoria !== "todos" && {
                    categoria: {
                        nombre: categoria
                    }
                })
            },
            include: {
                categoria: true
            },
            orderBy: { titulo: "asc" }
        })

        const articulos: ArticuloType[] = productos.map(p => ({
            id: p.id,
            titulo: p.titulo,
            precio: p.precio,
            imagenUrl: p.imagenUrl || undefined,
            enStock: p.enStock,
            categoria: p.categoria?.nombre,
            categoriaId: p.categoriaId || undefined
        }))

        return articulos

    } catch (error) {
        console.error("Error al obtener artículos:", error)
        return []
    }
}