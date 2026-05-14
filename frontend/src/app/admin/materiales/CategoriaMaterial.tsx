'use client'

import { useState } from "react"
import { Pencil, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import ModalKyanite from "@/components/ModalKyanite"
import CategoriaForm from "./CategoriaForm"
import CategoriaEliminar from "./CategoriaEliminar"
import type { CategoriaMaterial } from "@/types"

interface Props {
    categorias: CategoriaMaterial[]
}

export default function CategoriasMaterial({ categorias }: Props) {
    const [modalActivo, setModalActivo] = useState<"crear" | "editar" | "eliminar" | null>(null)
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<CategoriaMaterial | null>(null)

    const abrirEditar = (categoria: CategoriaMaterial) => {
        setCategoriaSeleccionada(categoria)
        setModalActivo("editar")
    }

    const abrirEliminar = (categoria: CategoriaMaterial) => {
        setCategoriaSeleccionada(categoria)
        setModalActivo("eliminar")
    }

    const cerrarModal = () => {
        setModalActivo(null)
        setCategoriaSeleccionada(null)
    }

    return (
        <div className="flex flex-col gap-3">

            <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-zinc-700">
                    Categorías de materiales
                </p>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setModalActivo("crear")}
                    className="gap-1 text-xs"
                >
                    <Plus className="h-3 w-3" />
                    Nueva
                </Button>
            </div>

            {categorias.length === 0 ? (
                <p className="text-xs text-zinc-400 italic">
                    No hay categorías todavía.
                </p>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {categorias.map((cat) => (
                        <div
                            key={cat.id}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 rounded-full group"
                        >
                            <span className="text-xs font-medium text-zinc-700">
                                {cat.nombre}
                            </span>

                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => abrirEditar(cat)}
                                    className="text-zinc-400 hover:text-zinc-900 transition-colors"
                                >
                                    <Pencil className="h-3 w-3" />
                                </button>
                                <button
                                    onClick={() => abrirEliminar(cat)}
                                    className="text-zinc-400 hover:text-red-600 transition-colors"
                                >
                                    <Trash2 className="h-3 w-3" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <ModalKyanite
                open={modalActivo === "crear"}
                onClose={cerrarModal}
                titulo="Nueva categoría"
                variant="formulario"
            >
                <CategoriaForm onSuccess={cerrarModal} />
            </ModalKyanite>

            <ModalKyanite
                open={modalActivo === "editar"}
                onClose={cerrarModal}
                titulo="Editar categoría"
                variant="formulario"
            >
                <CategoriaForm
                    categoria={categoriaSeleccionada ?? undefined}
                    onSuccess={cerrarModal}
                />
            </ModalKyanite>

            <ModalKyanite
                open={modalActivo === "eliminar"}
                onClose={cerrarModal}
                titulo="Eliminar categoría"
                variant="anuncio"
            >
                <CategoriaEliminar
                    categoria={categoriaSeleccionada}
                    onClose={cerrarModal}
                />
            </ModalKyanite>

        </div>
    )
}