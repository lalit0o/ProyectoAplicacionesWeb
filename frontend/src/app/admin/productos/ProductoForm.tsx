'use client'

import { useState, useTransition } from "react"
import { crearProducto, editarProducto } from "./actions"
import ImageUpload from "./ImageUpload"
import MaterialCategoria from "../materiales/MaterialCategoria"
import type { Producto, Material, CategoriaProducto, CategoriaMaterial } from "@/types"

interface Props {
    onSuccess: () => void
    producto?: Producto
    materialesDisponibles: Material[]
    categoriasDisponibles: CategoriaProducto[]
    categoriasMaterialDisponibles: CategoriaMaterial[] 
}

export default function ProductoForm({ 
    onSuccess, 
    producto, 
    materialesDisponibles,
    categoriasDisponibles,
    categoriasMaterialDisponibles
}: Props) {
    const [isPending, startTransition] = useTransition()
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    const [imagenUrl, setImagenUrl] = useState<string | null>(producto?.imagenUrl || null)
    const esEdicion = !!producto

    const handleSubmit = async (formData: FormData) => {
        if (!imagenUrl) {
            setErrorMsg("Debes subir una imagen del producto.")
            return
        }

        formData.set("imagenUrl", imagenUrl)

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

            
            <div className="flex gap-6">

                <div className="flex-shrink-0 w-56">
                    <label className="text-sm font-semibold text-zinc-700 block mb-2">
                        Imagen del Producto
                    </label>
                    <ImageUpload
                        imagenActual={imagenUrl}
                        onImagenSubida={setImagenUrl}
                    />
                </div>

                
                <div className="flex-1 flex flex-col gap-4">

                    
                    <div className="grid grid-cols-2 gap-4">

                        
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

                    </div>

                    
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-zinc-700">
                            Descripción del Producto
                        </label>
                        <textarea
                            name="descripcion"
                            defaultValue={producto?.descripcion || ""}
                            placeholder="Describe los detalles, características, materiales especiales..."
                            className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900 transition-all bg-zinc-50/50 resize-none"
                            rows={2}
                        />
                    </div>

                </div>

            </div>

            
            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-zinc-700">
                    Materiales que utiliza (Receta)
                </label>
                <MaterialCategoria
                    materialesDisponibles={materialesDisponibles}
                    categoriasDisponibles={categoriasMaterialDisponibles}
                    valoresSeleccionados={producto?.materialesIds}
                />
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