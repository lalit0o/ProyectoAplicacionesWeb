import { prisma } from "@/lib/prisma";

interface ArticuloType {
    id: number;
    titulo: string;
    precio: number;
    imagenUrl?: string;
    enStock: boolean;
    categoria?: string;
    categoriaId?: number;
}



export async function obtenerArticulos(categoria: string) {
    if (categoria == "todos") {
        const articulos : ArticuloType[] = await prisma.producto.findMany();
        return articulos;

    }
    else {
        const articulos: ArticuloType[] = await prisma.$queryRaw`select * from productos a inner join categorias_productos b on a."categoriaId" = b.id where b.nombre = ${categoria}`;
        return articulos;

    }
}