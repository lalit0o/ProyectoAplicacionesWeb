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

    const agruparPorCategoria = () => {
        const agrupados: Record<number, Material[]> = {}

        materialesDisponibles.forEach(mat => {
            const categoriaId = mat.categoriaId || 0
            if (!agrupados[categoriaId]) {
                agrupados[categoriaId] = []
            }
            agrupados[categoriaId].push(mat)
        })

        return agrupados
    }

    const toggleCategoria = (categoriaId: number) => {
        setExpandidas(prev => ({
            ...prev,
            [categoriaId]: !prev[categoriaId]
        }))
    }

    const agrupados = agruparPorCategoria()

    return (
        <div className="flex flex-col gap-3 border border-zinc-200 rounded-xl p-4 bg-zinc-50/50">

            {agrupados[0] && agrupados[0].length > 0 && (
                <div className="border-b border-zinc-200 pb-3 last:border-0">
                    <div className="font-semibold text-sm text-zinc-700 mb-2">Sin categoría</div>
                    <div className="grid grid-cols-2 gap-2">
                        {agrupados[0].map(mat => (
                            <label key={mat.id} className="flex items-center gap-2 text-sm cursor-pointer hover:text-zinc-900 text-zinc-700 transition-colors">
                                <input
                                    type="checkbox"
                                    name="materialesIds"
                                    value={mat.id}
                                    defaultChecked={valoresSeleccionados.includes(mat.id)}
                                    className="accent-zinc-900 w-4 h-4 rounded cursor-pointer"
                                />
                                {mat.nombre}
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {categoriasDisponibles.map(categoria => {
                const materialesDeLaCategoria = agrupados[categoria.id] || []
                if (materialesDeLaCategoria.length === 0) return null

                const estaExpandida = expandidas[categoria.id] ?? false

                return (
                    <div key={categoria.id} className="border-b border-zinc-200 pb-3 last:border-0">
                        <button
                            type="button"
                            onClick={() => toggleCategoria(categoria.id)}
                            className="w-full flex items-center justify-between text-sm font-semibold text-zinc-700 hover:text-zinc-900 transition-colors mb-2"
                        >
                            <span>{categoria.nombre}</span>
                            <ChevronDown
                                className={`h-4 w-4 transition-transform ${
                                    estaExpandida ? 'rotate-180' : ''
                                }`}
                            />
                        </button>

                        {estaExpandida && (
                            <div className="grid grid-cols-2 gap-2">
                                {materialesDeLaCategoria.map(mat => (
                                    <label key={mat.id} className="flex items-center gap-2 text-sm cursor-pointer hover:text-zinc-900 text-zinc-700 transition-colors">
                                        <input
                                            type="checkbox"
                                            name="materialesIds"
                                            value={mat.id}
                                            defaultChecked={valoresSeleccionados.includes(mat.id)}
                                            className="accent-zinc-900 w-4 h-4 rounded cursor-pointer"
                                        />
                                        {mat.nombre}
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