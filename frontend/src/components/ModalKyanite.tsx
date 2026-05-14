'use client'

import { useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = {
    open: boolean
    onClose: () => void
    children: React.ReactNode
    variant?: "anuncio" | "formulario"
    titulo?: string
}

export default function ModalKyanite({ open, onClose, children, variant = "anuncio", titulo }: Props) {

    useEffect(() => {
        if (!open) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose()
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }

    }, [open, onClose]) // solo re-corre cuando open o onClose cambian

    if (!open) return null

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={titulo}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
            
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            
            <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8 z-10 animate-in fade-in zoom-in-95 duration-200">

                
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 rounded-full"
                    aria-label="Cerrar modal"
                >
                    <X className="h-5 w-5" />
                </Button>

                
                {titulo && (
                    <h2 className={`mb-4 w-full ${
                        variant === "anuncio"
                            ? "font-serif text-2xl text-zinc-900 text-center"
                            : "font-sans text-xl font-bold text-zinc-800 text-left"
                    }`}>
                        {titulo}
                    </h2>
                )}

              
                <div className={`mt-2 flex flex-col ${
                    variant === "anuncio" ? "items-center" : "items-start"
                }`}>
                    <div className="w-full text-left">
                        {children}
                    </div>
                </div>

            </div>
        </div>
    )
}