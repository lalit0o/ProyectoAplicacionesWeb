'use client'

import { useState } from "react"
import ModalKyanite from "@/components/ModalKyanite"
import MaterialEditForm from "./MaterialForm" 

interface Props {
    material: { id: number; nombre: string; categoria?: string } 
}

export default function MaterialEditar({ material }: Props) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button 
                onClick={() => setIsOpen(true)} 
                className="text-xs text-zinc-400 hover:text-zinc-900 font-medium transition-colors"
            >
                Editar
            </button>

            <ModalKyanite 
                open={isOpen} 
                onClose={() => setIsOpen(false)} 
                titulo="Editar Material"
                variant="formulario"
            >
                <MaterialEditForm 
                    material={material}
                    
                    onSuccess={() => setIsOpen(false)} 
                />
            </ModalKyanite>
        </>
    )
}