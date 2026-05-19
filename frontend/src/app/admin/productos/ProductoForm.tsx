'use client'

import { useState, useTransition } from "react"
import { crearProducto, editarProducto } from "./actions"
import type { Producto, Material, CategoriaProducto } from "@/types"

interface Props {
    onSuccess: () => void
    producto?: Producto
    materialesDisponibles: Material[]
    categoriasDisponibles: CategoriaProducto[]
}

export default function ProductoForm({ onSuccess, producto, materialesDisponibles, categoriasDisponibles }: Props) {
    const [isPending, startTransition] = useTransition()
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    const esEdicion = !!producto

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const materialesIds = formData.getAll("materialesIds").map(id => Number(id))

            const res = esEdicion && producto
                ? await editarProducto(producto.id, formData, materialesIds)
                : await crearProducto(formData, materialesIds)

            if (res.success) {
                onSuccess()
            } else {
                setErrorMsg(res.error ?? "Error desconocido al procesar el producto.")
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
                    {esEdicion ? "Editar Nombre" : "Nombre del Producto"}
                </label>
                <input
                    name="titulo"
                    defaultValue={producto?.titulo ?? ""}
                    placeholder="Ej. Collar de Cuarzo"
                    className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900 transition-all bg-zinc-50/50"
                    required
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-zinc-700">
                    {esEdicion ? "Editar Precio" : "Precio del Producto"}
                </label>
                <input
                    name="precio"
                    type="number"
                    step="0.01"
                    min="0"
                    defaultValue={producto?.precio ?? ""}
                    placeholder="Ej. 499.99"
                    className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900 transition-all bg-zinc-50/50"
                    required
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-zinc-700">
                    {esEdicion ? "Editar URL de Imagen" : "URL de la Imagen"}
                </label>
                <input
                    name="imagenUrl"
                    defaultValue={producto?.imagenUrl ?? ""}
                    placeholder="https://ejemplo.com/anillo.jpg"
                    className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900 transition-all bg-zinc-50/50"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-zinc-700">
                    Categoría
                </label>
                <select
                    name="categoriaId"
                    defaultValue={producto?.categoriaId ?? ""}
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

            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-zinc-700">
                    Materiales que utiliza (Receta)
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto p-3 border border-zinc-200 rounded-xl bg-zinc-50/50">
                    {materialesDisponibles.map((mat) => (
                        <label key={mat.id} className="flex items-center gap-2 text-sm cursor-pointer hover:text-zinc-900 text-zinc-700 transition-colors">
                            <input
                                type="checkbox"
                                name="materialesIds"
                                value={mat.id}
                                defaultChecked={producto?.materialesIds?.includes(mat.id)}
                                className="accent-zinc-900 w-4 h-4 rounded cursor-pointer"
                            />
                            {mat.nombre}
                        </label>
                    ))}
                </div>
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full py-3 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:opacity-50 shadow-md"
            >
                {isPending ? "Procesando..." : esEdicion ? "Guardar Cambios" : "Crear Producto"}
            </button>

        </form>
    )
}