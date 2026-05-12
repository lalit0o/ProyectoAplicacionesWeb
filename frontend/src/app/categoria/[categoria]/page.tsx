import CategoriaUI from "@/components/CategoriaUI";
import { prisma } from "@/lib/prisma";
import { Producto } from "@prisma/client";

type Props = {
    params: {
        categoria: string;
    };
};

async function getByCategoria(categoria: string): Promise<Producto[]> {
    try {
        if (categoria === "todos") {
            return await prisma.producto.findMany();
        }

        return await prisma.producto.findMany({
            where: {
                categoria: categoria
            }
        });
    } catch (error) {
        console.error("Error al obtener productos: ", error);
        return [];
    }
}

export default async function CategoriaPage({ params }: Props) {
    const { categoria } = await params;
    const productosDB = await getByCategoria(categoria);

    const articulosAdaptados = productosDB.map((producto) => ({
        id: producto.id,
        titulo: producto.titulo,
        categoria: producto.categoria,
        precio: producto.precio,
        imagen: producto.imagenUrl ?? '/imagen1.webp',
    }));

    return (
        <CategoriaUI
            articulos={articulosAdaptados}
            tituloCategoria={categoria === "todos" ? "Colección completa" : categoria.charAt(0).toUpperCase() + categoria.slice(1)}
        />
    );
}