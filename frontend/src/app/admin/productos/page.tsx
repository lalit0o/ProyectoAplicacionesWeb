import { prisma } from "@/lib/prisma"
import { calcularStockReal } from "@/lib/utils/producto"
import type { Producto } from "@/types"
import ProductoAgregar from "./ProductoAgregar"
import CategoriasProducto from "./CategoriaProducto"
import { DataTable } from "@/components/DataTable"
import { columns } from "@/app/admin/productos/columns"

export default async function ProductosAdminPage() {

    const materialesDB = await prisma.material.findMany({
        orderBy: { nombre: "asc" },
        include: { categoria: true }
    })

    const categoriasDB = await prisma.categoriaProducto.findMany({
        orderBy: { nombre: "asc" }
    })

    const categoriasMaterialDB = await prisma.categoriaMaterial.findMany({
        orderBy: { nombre: "asc" }
    })

    const productosDB = await prisma.producto.findMany({
        orderBy: { titulo: "asc" },
        include: {
            categoria: true,
            recetas: {
                include: {
                    material: true
                }
            }
        }
    })

    const productos: Producto[] = productosDB.map((producto) => ({
        id: producto.id,
        titulo: producto.titulo,
        precio: producto.precio,
        imagenUrl: producto.imagenUrl,
        descripcion: producto.descripcion,
        enStock: producto.enStock,
        stockReal: calcularStockReal(producto),
        materialesIds: producto.recetas.map((r) => r.material.id),
        categoriaId: producto.categoriaId,
        categoria: producto.categoria ?? null
    }))

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">

            <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-100 pb-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-serif text-zinc-900 tracking-tight">
                        Panel de productos
                    </h1>
                    <p className="text-zinc-500 text-sm">
                        Gestiona el inventario de collares y anillos de{" "}
                        <span className="italic font-medium">Kyanite Artesanal</span>.
                    </p>
                </div>

                <ProductoAgregar 
                    materiales={materialesDB} 
                    categorias={categoriasDB}
                    categoriasMaterial={categoriasMaterialDB}
                />
            </section>

            <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <CategoriasProducto categorias={categoriasDB} />
            </section>

            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <DataTable
                    columns={columns}
                    data={productos}
                    meta={{ 
                        materiales: materialesDB, 
                        categorias: categoriasDB,
                        categoriasMaterial: categoriasMaterialDB
                    }}
                    searchKey="titulo"
                />
            </div>

        </div>
    )
}