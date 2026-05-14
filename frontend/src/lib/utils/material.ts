// función que agrupe materiales por categoría que  recibe un array de materiales y retorna algo como { nombreCategoria: [materiales] }

import type { Material } from "@/types"

export function agruparMaterialesPorCategoria(materiales: Material[]) {
    const agrupados: Record<string, Material[]> = {}
    
    materiales.forEach(material => {
        const categoria = material.categoria?.nombre ?? "Sin categoría"
        
        if (!agrupados[categoria]) {
            agrupados[categoria] = []
        }
        agrupados[categoria].push(material)
    })
    
    return agrupados
}
   