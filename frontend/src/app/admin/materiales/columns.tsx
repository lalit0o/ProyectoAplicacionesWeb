"use client"

import { ColumnDef } from "@tanstack/react-table"
import type { Material, CategoriaMaterial } from "@/types"
import MaterialAcciones from "./MaterialAcciones"
import MaterialSwitch from "./MaterialSwitch"

interface TableMeta {
    categorias: CategoriaMaterial[]
}

export const columns: ColumnDef<Material>[] = [
    {
        accessorKey: "nombre",
        header: "Material",
        cell: ({ row }) => (
            <span className="font-medium text-zinc-900">
                {row.getValue("nombre")}
            </span>
        )
    },
    {
        accessorFn: (row) => row.categoria?.nombre,
        header: "Categoría",
        id: "categoria",
        filterFn: (row, id, filterValue) => {
            const categoriaNombre = row.original.categoria?.nombre ?? "Sin categoría"
            return categoriaNombre.toLowerCase().includes(filterValue.toLowerCase())
        },
        cell: ({ row }) => {
            const categoria = row.original.categoria
            return (
                <span className="text-sm text-zinc-700">
                    {categoria ? categoria.nombre : "Sin categoría"}
                </span>
            )
        }
    },
    {
        accessorKey: "enStock",
        header: "En Stock",
        cell: ({ row }) => (
            <MaterialSwitch
                id={row.original.id}
                initialStock={row.getValue("enStock") as boolean}
            />
        )
    },
    {
        id: "acciones",
        header: () => <div className="text-right px-4">Acciones</div>,
        cell: ({ row, table }) => {
            const meta = table.options.meta as TableMeta
            const categorias = meta?.categorias ?? []

            return (
                <div className="text-right px-4">
                    <MaterialAcciones
                        material={row.original}
                        categoriasDisponibles={categorias}
                    />
                </div>
            )
        }
    }
]