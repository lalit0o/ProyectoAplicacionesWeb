"use client"

import { ColumnDef } from "@tanstack/react-table"
import type { Producto, Material } from "@/types"
import ProductoAcciones from "./ProductoAcciones"


interface TableMeta {
    materiales: Material[]
}

export const columns: ColumnDef<Producto>[] = [
    {
        accessorKey: "imagenUrl",
        header: "Imagen",
        cell: ({ row }) => {
            const url = row.getValue("imagenUrl") as string | null
            return (
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-zinc-200 bg-zinc-50">
                    {url ? (
                        <img src={url} alt="Producto" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-zinc-200" />
                    )}
                </div>
            )
        }
    },
    {
        accessorKey: "titulo",
        header: "Producto",
        cell: ({ row }) => (
            <span className="font-medium text-zinc-900">
                {row.getValue("titulo")}
            </span>
        )
    },
    {
        accessorKey: "stockReal",
        header: () => <div className="text-center">Estado</div>,
        cell: ({ row }) => {
            const disponible = row.getValue("stockReal") as boolean
            return (
                <div className="flex justify-center">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        disponible
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}>
                        {disponible ? "Disponible" : "Agotado"}
                    </span>
                </div>
            )
        }
    },
    {
        accessorKey: "precio",
        header: "Precio",
        cell: ({ row }) => {
            const precio = parseFloat(row.getValue("precio"))
            const formateado = new Intl.NumberFormat("es-MX", {
                style: "currency",
                currency: "MXN"
            }).format(precio)

            return (
                <span className="font-medium text-zinc-900">
                    {formateado}
                </span>
            )
        }
    },
    {
        id: "acciones",
        header: () => <div className="text-right px-4">Acciones</div>,
        cell: ({ row, table }) => {

            const meta = table.options.meta as TableMeta
            const materiales = meta?.materiales ?? []

            return (
                <div className="text-right px-4">
                    <ProductoAcciones
                        producto={row.original}
                        materialesDisponibles={materiales}
                    />
                </div>
            )
        }
    }
]