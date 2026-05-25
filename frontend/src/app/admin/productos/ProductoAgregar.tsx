'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ModalKyanite from "@/components/ModalKyanite"
import ProductoForm from "./ProductoForm"
import type { Material, CategoriaProducto, CategoriaMaterial } from "@/types"

interface Props {
    materiales: Material[]
    categorias: CategoriaProducto[]
    categoriasMaterial: CategoriaMaterial[]
}

export default function ProductoAgregar({ materiales, categorias, categoriasMaterial }: Props) {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                className="bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm transition-all active:scale-95"
            >
                + Añadir Producto
            </Button>

            <ModalKyanite
                open={isOpen}
                onClose={() => setIsOpen(false)} 
                variant="formulario-grande"
                titulo="Nuevo producto para Kyanite"
            >
              
                <ProductoForm 
                    onSuccess={() => setIsOpen(false)} 
                    materialesDisponibles={materiales} 
                    categoriasDisponibles={categorias}
                    categoriasMaterialDisponibles={categoriasMaterial}
                />
            </ModalKyanite>

        </>
    )
}