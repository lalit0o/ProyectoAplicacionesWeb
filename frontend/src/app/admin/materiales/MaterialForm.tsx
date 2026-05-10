'use client'

import { useTransition } from "react"
import { crearMaterial, editarMaterial} from "./actions"

interface Props {
    onSuccess: () => void;
    material?: { id: number; nombre: string };
}

export default function MaterialForm({ onSuccess, material }: Props) {
    const [isPending, startTransition] = useTransition()
    const esEdicion = !!material 

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            let res;
            if (esEdicion && material) {
                res = await editarMaterial(material.id, formData)
            } else {
                const nombre = formData.get("nombre") as string
                res = await crearMaterial(nombre) 
            }

            if (res.success) {
                onSuccess()
            } else {
                alert(res.error)
            }
        })
    }

    return (
        <form action={handleSubmit} className="w-full flex flex-col gap-6 pt-2">
         
            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-zinc-700">
                    {esEdicion ? "Editar Nombre" : "Nombre del Material"}
                </label>
                <input 
                    name="nombre" 
                    defaultValue={material?.nombre || ""} 
                    placeholder="Ej. Amatista"
                    
                    className="w-full px-4 p-3 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all bg-zinc-50/50" 
                    required 
                />
            </div>

            
            <div className="flex justify-center pt-2">
                <button 
                    type="submit" 
                    disabled={isPending} 
                    className="w-full py-3 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:opacity-50 shadow-md"
                >
                    {isPending ? "Procesando..." : esEdicion ? "Guardar Cambios" : "Crear Material"}
                </button>
            </div>
        </form>
    )
}