"use client"

import { ColumnDef } from "@tanstack/react-table"
import type { Material, CategoriaMaterial } from "@/types"
import MaterialAcciones from "./MaterialAcciones"
import MaterialSwitch from "./MaterialSwitch"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

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
        accessorKey: "categoria.nombre", 
        id: "categoria",
        header: ({ column }) => {
            return (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                
            >
            <span className="text-sm font-bold text-zinc-950">Categoría</span>
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            )
        },
        cell: ({ row }) => {
            const nombre = row.original.categoria?.nombre
            return (
            <span className="px-4 text-sm text-zinc-700">
                {nombre ?? "Sin categoría"}
            </span>
            )
        },
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