'use client'

import { useState, useTransition } from "react"
import { Trash2, Edit, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { eliminarMaterial } from "./actions"
import ModalKyanite from "@/components/ModalKyanite"
import MaterialEditForm from "./MaterialForm" 


export default function MaterialAcciones({ material }: { material: any }) {
    const [modalActivo, setModalActivo] = useState<"editar" | "eliminar" | null>(null)
    const [isPending, startTransition] = useTransition()
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
   
    const handleClose = () => {
        setModalActivo(null)
        setErrorMsg(null) 
    }

   const handleDelete = () => {
        startTransition(async () => {
            const res = await eliminarMaterial(material.id)
            if (res.success) {
                handleClose()
            } else {
                setErrorMsg(res.error || "Error desconocido")
            }
        })
    }

    return (
        <div className="flex justify-end gap-3">
            
           
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={(e) => {
                    e.stopPropagation(); 
                    setModalActivo("editar");
                }}
                className="h-8 w-8 text-zinc-400 hover:text-zinc-900 transition-colors"
            >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Editar</span>
            </Button>

         
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={(e) => {
                    e.stopPropagation(); 
                    setModalActivo("eliminar");
                }}
                className="h-8 w-2
                 text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Eliminar</span>
            </Button>

          
            <ModalKyanite 
                open={modalActivo === "editar"} 
                onClose={handleClose}
                titulo="Editar Material"
                variant="formulario"
            >

                <MaterialEditForm 
                    material={material} 
                    onSuccess={handleClose} 
                />
            </ModalKyanite>

           
           <ModalKyanite 
                open={modalActivo === "eliminar"} 
                onClose={handleClose}
                titulo="Confirmar eliminación"
                variant="anuncio"
            >
                <div className="space-y-6">
                  
                    {errorMsg ? (
                      <div className="flex gap-3 items-start text-left bg-amber-50 border border-amber-200 p-4 rounded-xl w-full">
                        <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-bold text-amber-900 leading-none">Acción bloqueada</p>
                            <p className="text-xs text-amber-700 leading-normal">
                                Este material está vinculado a un producto...
                            </p>
                        </div>
                    </div>
                    ) : (
                        <p className="text-sm text-zinc-500 text-center leading-relaxed">
                            ¿Estás seguro de borrar <span className="font-bold text-zinc-900">{material.nombre}</span>?
                        </p>
                    )}
                    
                    <div className="flex gap-3 mt-4">
                        <Button variant="outline" className="flex-1" onClick={handleClose}>
                            {errorMsg ? "Cerrar" : "Cancelar"}
                        </Button>
                        
                       
                        {!errorMsg && (
                            <Button 
                                variant="destructive" 
                                className="flex-1 bg-red-600 hover:bg-red-700" 
                                onClick={handleDelete}
                                disabled={isPending}
                            >
                                {isPending ? "Borrando..." : "Eliminar"}
                            </Button>
                        )}
                    </div>
                </div>
            </ModalKyanite>
        </div>
    )
}