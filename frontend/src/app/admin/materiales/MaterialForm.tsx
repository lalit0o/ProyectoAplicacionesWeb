'use client'

import { useState, useTransition } from "react"
import { crearMaterial, editarMaterial } from "./actions"
import { agruparMaterialesPorCategoria } from "@/lib/utils/material"
import type { Material, CategoriaMaterial } from "@/types"

interface Props {
    onSuccess: () => void
    material?: Material
    categoriasDisponibles: CategoriaMaterial[]
}

export default function MaterialForm({ onSuccess, material, categoriasDisponibles }: Props) {
    const [isPending, startTransition] = useTransition()
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    const esEdicion = !!material

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const res = esEdicion && material
                ? await editarMaterial(material.id, formData)
                : await crearMaterial(formData)

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
                    {esEdicion ? "Editar Nombre" : "Nombre del Material"}
                </label>
                <input
                    name="nombre"
                    defaultValue={material?.nombre ?? ""}
                    placeholder="Ej. Amatista"
                    className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900 transition-all bg-zinc-50/50"
                    required
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-zinc-700">
                    Categoría
                </label>
                <select
                    name="categoriaId"
                    defaultValue={material?.categoriaId ?? ""}
                    className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900 transition-all bg-zinc-50/50"
                >
                    <option value="">Sin categoría</option>
                    {categoriasDisponibles.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full py-3 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:opacity-50 shadow-md"
            >
                {isPending ? "Procesando..." : esEdicion ? "Guardar Cambios" : "Crear Material"}
            </button>

        </form>
    )
}