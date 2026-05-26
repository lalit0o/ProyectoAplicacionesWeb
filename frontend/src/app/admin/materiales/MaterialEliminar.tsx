'use client'

import { useState, useTransition } from "react"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { eliminarMaterial } from "./actions"
import type { Material } from "@/types"

interface Props {
    material: Material
    onClose: () => void
}

export default function MaterialEliminar({ material, onClose }: Props) {
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    const handleEliminar = () => {
        startTransition(async () => {
            const res = await eliminarMaterial(material.id)

            if (res.success) {
                onClose()
            } else {
                setErrorMsg(res.error ?? "Error desconocido")
            }
        })
    }

    return (
        <div className="space-y-6">
            {errorMsg ? (
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-3 items-start animate-in fade-in">
                    <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                        <p className="text-sm font-bold text-amber-900">Material en uso</p>
                        <p className="text-xs text-amber-700 leading-relaxed">{errorMsg}</p>
                    </div>
                </div>
            ) : (
                <p className="text-sm text-zinc-500 leading-relaxed">
                    ¿Estás seguro de eliminar{" "}
                    <span className="font-bold text-zinc-900">{material.nombre}</span>?
                </p>
            )}

            <div className="flex gap-3">
                <Button
                    variant="outline"
                    className="flex-1"
                    onClick={onClose}
                    disabled={isPending}
                >
                    {errorMsg ? "Entendido" : "Cancelar"}
                </Button>

                {!errorMsg && (
                    <Button
                        variant="destructive"
                        className="flex-1"
                        onClick={handleEliminar}
                        disabled={isPending}
                    >
                        {isPending ? "Eliminando..." : "Eliminar"}
                    </Button>
                )}
            </div>
        </div>
    )
}