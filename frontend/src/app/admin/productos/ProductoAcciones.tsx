'use client'

import { useState, useTransition } from "react"
import { Trash2, Edit, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { eliminarProducto } from "./actions"
import ModalKyanite from "@/components/ModalKyanite"
import ProductoForm from "./ProductoForm" 

interface Props {
    producto: any;
    materialesDisponibles: any[]; 
}

export default function ProductoAcciones({ producto, materialesDisponibles }: Props){
    const [modalActivo, setModalActivo] = useState<"editar" | "eliminar" | null>(null)
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    const handleClose = () => {
        setModalActivo(null)
        setErrorMsg(null)
    }

    const handleDelete = () => {
        startTransition(async () => {
            const res = await eliminarProducto(producto.id)
            if (res.success) {
                handleClose()
            } else {
                setErrorMsg(res.error)
            }
        })
    }

    return (
        <div className="flex justify-end gap-2">
            <Button variant="ghost" size="icon" onClick={() => setModalActivo("editar")}>
                <Edit className="h-4 w-4 text-zinc-400 hover:text-zinc-900" />
            </Button>

            <Button variant="ghost" size="icon" onClick={() => setModalActivo("eliminar")}>
                <Trash2 className="h-4 w-4 text-zinc-400 hover:text-red-600" />
            </Button>

            <ModalKyanite open={modalActivo === "editar"} onClose={handleClose} titulo="Editar Pieza" variant="formulario">
                <ProductoForm 
                    producto={producto} 
                    materialesDisponibles={materialesDisponibles} 
                    onSuccess={handleClose} 
                />
            </ModalKyanite>

        
            <ModalKyanite open={modalActivo === "eliminar"} onClose={handleClose} titulo="Eliminar producto" variant="anuncio">
                <div className="space-y-6">
                    {errorMsg ? (
                        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-3 items-start animate-in fade-in">
                            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                            <div className="space-y-1">
                                <p className="text-sm font-bold text-amber-900">Producto Protegido</p>
                                <p className="text-xs text-amber-700 leading-relaxed">{errorMsg}</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-zinc-500 leading-relaxed">
                            ¿Estás seguro de eliminar <span className="font-bold text-zinc-900">{producto.nombre}</span> del catálogo?
                        </p>
                    )}
                    
                    <div className="flex gap-3">
                        <Button variant="outline" className="flex-1" onClick={handleClose}>
                            {errorMsg ? "Entendido" : "Cancelar"}
                        </Button>
                        {!errorMsg && (
                            <Button variant="destructive" className="flex-1" onClick={handleDelete} disabled={isPending}>
                                {isPending ? "Eliminando..." : "Eliminar"}
                            </Button>
                        )}
                    </div>
                </div>
            </ModalKyanite>
        </div>
    )
}