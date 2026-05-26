import { prisma } from "@/lib/prisma"
import type { Material } from "@/types"
import MaterialAgregar from "./MaterialAgregar"
import CategoriaMaterial from "./CategoriaMaterial"
import { DataTable } from "@/components/DataTable"
import { columns } from "./columns"
export const dynamic = 'force-dynamic';

export default async function MaterialesAdminPage() {

    const categoriasDB = await prisma.categoriaMaterial.findMany({
        orderBy: { nombre: "asc" }
    })

    const materialesDB = await prisma.material.findMany({
        orderBy: { nombre: "asc" },
        include: {
            categoria: true
        }
    })

    const materiales: Material[] = materialesDB.map((material) => ({
        id: material.id,
        nombre: material.nombre,
        enStock: material.enStock,
        categoriaId: material.categoriaId,
        categoria: material.categoria ?? null
    }))

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">

            <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-100 pb-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-serif text-zinc-900 tracking-tight">
                        Panel de materiales
                    </h1>
                    <p className="text-zinc-500 text-sm">
                        Gestiona los materiales que usa{" "}
                        <span className="italic font-medium">Kyanite Artesanal</span>.
                    </p>
                </div>

                <MaterialAgregar categorias={categoriasDB}/>
            </section>

            <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <CategoriaMaterial categorias={categoriasDB} />
            </section>

            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <DataTable
                    columns={columns}
                    data={materiales}
                    meta={{ categorias: categoriasDB }}
                    searchKey="nombre"
                />
            </div>

        </div>
    )
}