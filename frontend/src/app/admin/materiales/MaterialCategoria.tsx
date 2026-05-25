'use client'

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import type { Material, CategoriaMaterial } from "@/types"

interface Props {
    materialesDisponibles: Material[]
    categoriasDisponibles: CategoriaMaterial[]
    valoresSeleccionados?: number[]
}

export default function MaterialesPorCategoria({ 
    materialesDisponibles, 
    categoriasDisponibles,
    valoresSeleccionados = []
}: Props) {
   
    const [expandidas, setExpandidas] = useState<Record<number, boolean>>({})

  
    const agrupados = materialesDisponibles.reduce((materialesAgrupados, materialActual) => {
        const catId = materialActual.categoriaId || 0;
        if (!materialesAgrupados[catId]) materialesAgrupados[catId] = [];
        materialesAgrupados[catId].push(materialActual);
        return materialesAgrupados;
    }, {} as Record<number, Material[]>);

   
    const categoriasARenderizar = [
        { id: 0, nombre: "Sin categoría" },
        ...categoriasDisponibles
    ].filter(cat => agrupados[cat.id]?.length > 0); 

    const toggleCategoria = (id: number) => {
        setExpandidas(prev => ({ ...prev, [id]: !prev[id] }))
    }

    return (
        <div className="flex flex-col gap-3 border border-zinc-200 rounded-xl p-4 bg-zinc-50/50">
          
            {categoriasARenderizar.map(categoria => {
                const materiales = agrupados[categoria.id]
                const estaExpandida = expandidas[categoria.id] ?? false

                return (
                    <div key={categoria.id} className="border-b border-zinc-200 pb-3 last:border-0">
                       
                        <button
                            type="button"
                            onClick={() => toggleCategoria(categoria.id)}
                            className="w-full flex items-center justify-between text-sm font-semibold text-zinc-700 hover:text-zinc-900 transition-colors mb-2"
                        >
                            <span>{categoria.nombre}</span>
                            <ChevronDown className={`h-4 w-4 transition-transform ${estaExpandida ? 'rotate-180' : ''}`} />
                        </button>

                        
                        {estaExpandida && (
                            <div className="grid grid-cols-2 gap-2">
                                {materiales.map(materialActual => (
                                    <label key={materialActual.id} className="flex items-center gap-2 text-sm cursor-pointer hover:text-zinc-900 text-zinc-700 transition-colors">
                                        <input
                                            type="checkbox"
                                            name="materialesIds"
                                            value={materialActual.id}
                                            defaultChecked={valoresSeleccionados.includes(materialActual.id)}
                                            className="accent-zinc-900 w-4 h-4 rounded cursor-pointer"
                                        />
                                        {materialActual.nombre}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}