'use client'

import { useState } from "react"
import { Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import type {Producto, Material, CategoriaProducto, CategoriaMaterial} from "@/types"
import ModalKyanite from "@/components/ModalKyanite"
import ProductoForm from "./ProductoForm" 
import ProductoEliminar from "./ProductoEliminar"

interface Props {
    producto: Producto; 
    materialesDisponibles: Material[]; 
    categoriasDisponibles: CategoriaProducto[]
    categoriasMaterialDisponibles: CategoriaMaterial[]  
}

export default function ProductoAcciones({ producto, materialesDisponibles, categoriasDisponibles, categoriasMaterialDisponibles }: Props){
    const [modalActivo, setModalActivo] = useState<"editar" | "eliminar" | null>(null)

    return (
        <div className="flex justify-end gap-2">
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setModalActivo("editar")}>
                <Edit className="h-4 w-4 text-zinc-400 hover:text-zinc-900" />
            </Button>

            <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setModalActivo("eliminar")}>
                <Trash2 className="h-4 w-4 text-zinc-400 hover:text-red-600" />
            </Button>

            <ModalKyanite 
                open={modalActivo === "editar"} 
                onClose={() => setModalActivo(null)}
                titulo="Editar Pieza" 
                variant="formulario-grande" >

                <ProductoForm 
                    producto={producto} 
                    materialesDisponibles={materialesDisponibles} 
                    categoriasDisponibles={categoriasDisponibles}
                    categoriasMaterialDisponibles={categoriasMaterialDisponibles}
                    onSuccess={() => setModalActivo(null)} 
                />
            </ModalKyanite>

            <ModalKyanite 
                open={modalActivo === "eliminar"} 
                onClose={() => setModalActivo(null)} 
                titulo="Eliminar producto" 
                variant="anuncio">
               <ProductoEliminar
                    producto={producto}
                    onClose={() => setModalActivo(null)}
                />
            </ModalKyanite>
        </div>
    )
}