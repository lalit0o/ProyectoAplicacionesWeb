'use client'

import { useTransition } from "react"
import { crearProducto, editarProducto } from "./actions"

interface Props {
    onSuccess: () => void;

    producto?: { 
        id: number; 
        titulo: string; 
        precio: number; 
        imagenUrl: string; 
        materialesIds?: number[] 
    };
 
    materialesDisponibles: { id: number; nombre: string }[];
}

export default function ProductoForm({ onSuccess, producto, materialesDisponibles }: Props) {
    const [isPending, startTransition] = useTransition()
    const esEdicion = !!producto 

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            let res;
          
            const materialesIds = formData.getAll("materialesIds").map(id => Number(id));

            if (esEdicion && producto) {
             
                res = await editarProducto(producto.id, formData, materialesIds)
            } else {
                
                const titulo = formData.get("nombre") as string
                const precio = Number(formData.get("precio"))
                const imagenUrl = formData.get("imagenUrl") as string
                
                res = await crearProducto(titulo, imagenUrl, precio, materialesIds)
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
                    {esEdicion ? "Editar Nombre" : "Nombre del Producto"}
                </label>
                <input 
                    name="nombre" 
                    defaultValue={producto?.titulo || ""} 
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
                    defaultValue={producto?.precio || ""} 
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
                    defaultValue={producto?.imagenUrl || ""} 
                    placeholder="https://ejemplo.com/anillo.jpg"
                    className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900 transition-all bg-zinc-50/50" 
                    required 
                />
            </div>

           
            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-zinc-700">
                    Materiales que utiliza (Receta)
                </label>
               
                <div className=" px-4 py-1 grid grid-cols-2 gap-2 max-h-32 overflow-y-auto p-3 border border-zinc-200 rounded-xl bg-zinc-50/50">
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
            
            <div className="flex justify-center pt-2">
                <button 
                    type="submit" 
                    disabled={isPending} 
                    className="w-full py-3 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:opacity-50 shadow-md"
                >
                    {isPending ? "Procesando..." : esEdicion ? "Guardar Cambios" : "Crear Producto"}
                </button>
            </div>
        </form>
    )
}