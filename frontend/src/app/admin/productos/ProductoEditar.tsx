'use client'

import { useState } from "react"
import ModalKyanite from "@/components/ModalKyanite"
import ProductoEditForm from "./ProductoForm" 

interface Props {
   
    producto: { 
        id: number; 
        titulo: string; 
        precio: number; 
        imagenUrl: string;
        materialesIds: number[]; 
    };

    materiales: { id: number; nombre: string }[];
}


export default function ProductoEditar({ producto, materiales }: Props) {
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
                titulo="Editar Producto"
                variant="formulario"
            >
                <ProductoEditForm
                    producto={producto}
                   
                    materialesDisponibles={materiales} 
                    onSuccess={() => setIsOpen(false)} 
                />
            </ModalKyanite>
        </>
    )
}