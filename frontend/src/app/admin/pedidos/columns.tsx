"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import type { Pedido } from "@/types"

export const columns: ColumnDef<Pedido>[] = [
    {
        accessorKey: "id",
        header: "Pedido ID",
        cell: ({ row }) => (
            <Link
                href={`/admin/pedidos/${row.getValue("id")}`}
                className="font-medium text-blue-600 hover:underline"
            >
                #{row.getValue("id")}
            </Link>
        )
    },
    {
        accessorFn: (row) => row.usuario?.nombre || "Sin cliente",
        header: "Cliente",
        id: "cliente",
        cell: ({ row }) => (
            <span className="text-sm text-zinc-700">
                {row.original.usuario?.nombre || "Desconocido"}
            </span>
        )
    },
    {
        accessorKey: "total",
        header: "Total",
        cell: ({ row }) => {
            const total = parseFloat(row.getValue("total"))
            const formateado = new Intl.NumberFormat("es-MX", {
                style: "currency",
                currency: "MXN"
            }).format(total)
            return <span className="font-medium text-zinc-900">{formateado}</span>
        }
    },
    {
        accessorKey: "estadoPedido",
        header: "Estado",
        cell: ({ row }) => {
            const estado = row.getValue("estadoPedido") as string
            const colores: Record<string, string> = {
                PENDIENTE: "bg-yellow-100 text-yellow-700",
                ACEPTADO: "bg-blue-100 text-blue-700",
                ELABORANDO: "bg-purple-100 text-purple-700",
                TERMINADO: "bg-green-100 text-green-700",
                ENVIADO: "bg-indigo-100 text-indigo-700",
                ENTREGADO: "bg-emerald-100 text-emerald-700"
            }

            return (
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${colores[estado] || "bg-zinc-100"}`}>
                    {estado}
                </span>
            )
        }
    },
    {
        accessorFn: (row) => row.fechaCreacion,
        header: "Fecha",
        id: "fecha",
        cell: ({ row }) => {
            const fecha = new Date(row.original.fechaCreacion)
            return <span className="text-sm text-zinc-600">{fecha.toLocaleDateString("es-MX")}</span>
        }
    },
    {
        id: "acciones",
        header: "Acciones",
        cell: ({ row }) => (
            <Link
                href={`/admin/pedidos/${row.original.id}`}
                className="text-sm font-medium text-blue-600 hover:underline"
            >
                Ver detalle
            </Link>
        )
    }
]