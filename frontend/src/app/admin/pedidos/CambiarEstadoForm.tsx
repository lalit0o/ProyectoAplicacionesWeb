'use client'

import { useState, useTransition } from "react"
import { cambiarEstadoPedido } from "./actions"
import type { EstadoPedido } from "@/types"

interface Props {
    pedidoId: number
    estadoActual: EstadoPedido
    onSuccess: () => void
}

const ESTADOS: EstadoPedido[] = ["PENDIENTE", "ACEPTADO", "ELABORANDO", "TERMINADO", "ENVIADO", "ENTREGADO"]

export default function CambiarEstadoForm({ pedidoId, estadoActual, onSuccess }: Props) {
    const [isPending, startTransition] = useTransition()
    const [errorMsg, setErrorMsg] = useState<string | null>(null)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const nuevoEstado = formData.get("estado") as string

        startTransition(async () => {
            const res = await cambiarEstadoPedido(pedidoId, nuevoEstado)

            if (res.success) {
                onSuccess()
            } else {
                setErrorMsg(res.error ?? "Error desconocido")
            }
        })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            {errorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                    {errorMsg}
                </div>
            )}

            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-zinc-700">
                    Nuevo estado
                </label>
                <select
                    name="estado"
                    disabled={estadoActual === "ENTREGADO"}
                    defaultValue={estadoActual}
                    className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900 transition-all bg-zinc-50/50"
                    required
                >
                    {ESTADOS.map((estado) => (
                        <option key={estado} value={estado}>
                            {estado}
                        </option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full py-3 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:opacity-50 shadow-md"
            >
                {isPending ? "Cambiando..." : "Cambiar estado"}
            </button>

        </form>
    )
}