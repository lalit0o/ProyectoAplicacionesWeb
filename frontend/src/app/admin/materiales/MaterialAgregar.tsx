'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ModalKyanite from "@/components/ModalKyanite"
import MaterialForm from "./MaterialForm"
import type { CategoriaMaterial } from "@/types"

interface Props {
    categorias: CategoriaMaterial[]
}

export default function MaterialAgregar({ categorias }: Props) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                className="bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm transition-all active:scale-95"
            >
                + Añadir Material
            </Button>

            <ModalKyanite
                open={isOpen}
                onClose={() => setIsOpen(false)}
                variant="formulario"
                titulo="Nuevo Material para Kyanite"
            >
                <MaterialForm
                    categoriasDisponibles={categorias}
                    onSuccess={() => setIsOpen(false)}
                />
            </ModalKyanite>
        </>
    )
}