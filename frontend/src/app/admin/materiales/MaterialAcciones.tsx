'use client'

import { useState, useTransition } from "react"
import { Trash2, Edit, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { eliminarMaterial } from "./actions"
import ModalKyanite from "@/components/ModalKyanite"
import MaterialForm from "./MaterialForm"
import MaterialEliminar from "./MaterialEliminar"
import type { Material, CategoriaMaterial } from "@/types"

interface Props {
    material: Material
    categoriasDisponibles: CategoriaMaterial[]
}

export default function MaterialAcciones({ material, categoriasDisponibles }: Props) {
    const [modalActivo, setModalActivo] = useState<"editar" | "eliminar" | null>(null)

    const handleClose = () => {
        setModalActivo(null)
    }

    return (
        <div className="flex justify-end gap-2">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setModalActivo("editar")}
            >
                <Edit className="h-4 w-4 text-zinc-400 hover:text-zinc-900" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                onClick={() => setModalActivo("eliminar")}
            >
                <Trash2 className="h-4 w-4 text-zinc-400 hover:text-red-600" />
            </Button>

            <ModalKyanite
                open={modalActivo === "editar"}
                onClose={handleClose}
                titulo="Editar Material"
                variant="formulario"
            >
                <MaterialForm
                    material={material}
                    categoriasDisponibles={categoriasDisponibles}
                    onSuccess={handleClose}
                />
            </ModalKyanite>

            <ModalKyanite
                open={modalActivo === "eliminar"}
                onClose={handleClose}
                titulo="Eliminar material"
                variant="anuncio"
            >
                <MaterialEliminar
                    material={material}
                    onClose={handleClose}
                />
            </ModalKyanite>
        </div>
    )
}