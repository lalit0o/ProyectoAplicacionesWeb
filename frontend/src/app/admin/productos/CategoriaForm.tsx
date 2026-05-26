'use client'

import { useState, useTransition } from "react"
import { crearCategoriaProducto, editarCategoriaProducto } from "./actions"
import type { CategoriaProducto } from "@/types"

interface Props {
    onSuccess: () => void
    categoria?: CategoriaProducto
}

export default function CategoriaForm({ onSuccess, categoria }: Props) {
    const [isPending, startTransition] = useTransition()
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    const esEdicion = categoria !== undefined && categoria !== null;

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const res = esEdicion && categoria
                ? await editarCategoriaProducto(categoria.id, formData)
                : await crearCategoriaProducto(formData)

            if (res.success) {
                onSuccess()
            } else {
                setErrorMsg(res.error ?? "Error desconocido")
            }
        })
    }

    return (
        <form action={handleSubmit} className="w-full flex flex-col gap-6 pt-2">

            {errorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                    {errorMsg}
                </div>
            )}

            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-zinc-700">
                    Nombre de la categoría
                </label>
                <input
                    name="nombre"
                    defaultValue={categoria?.nombre ?? ""}
                    placeholder="Ej. Collares"
                    className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900 transition-all bg-zinc-50/50"
                    required
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full py-3 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:opacity-50 shadow-md"
            >
                {isPending ? "Procesando..." : esEdicion ? "Guardar Cambios" : "Crear Categoría"}
            </button>

        </form>
    )
}