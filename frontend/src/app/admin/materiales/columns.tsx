"use client"

import { ColumnDef } from "@tanstack/react-table"
import MaterialSwitch from "./MaterialSwitch"
import MaterialEditar from "./MaterialEditar";

// Definimos la forma de nuestros datos según tu esquema de Prisma
export type Material = {
  id: number
  nombre: string
//   categoria: string
  enStock: boolean
}

export const columns: ColumnDef<Material>[] = [
  {
    accessorKey: "nombre",
    header: "Material",
    cell: ({ row }) => (
        <span className="font-medium text-zinc-900">{row.getValue("nombre")}</span>
    )
  },
//   {
//     accessorKey: "categoria",
//     header: "Categoría",
//     cell: ({ row }) => (
//         <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-600">
//             {row.getValue("categoria")}
//         </span>
//     )
//   },
  {
    accessorKey: "enStock",
    header: () => <div className="text-center">Stock</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <MaterialSwitch id={row.original.id} initialStock={row.original.enStock} />
      </div>
    ),
  },
  {
    id: "acciones",
    header: () => <div className="text-right px-6">Acciones</div>,
    cell: ({ row }) => {
      const material = row.original;

      return (
        <div className="text-right px-6">
          <MaterialEditar material={material} />
        </div>
      );
    },
  },
]