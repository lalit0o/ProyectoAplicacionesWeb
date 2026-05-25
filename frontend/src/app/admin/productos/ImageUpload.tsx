'use client'

import { useState, useTransition } from "react"
import { Upload, X } from "lucide-react"
import Image from "next/image"
import { subirImagenProducto } from "./actions"

interface Props {
    onImagenSubida: (url: string) => void
    imagenActual?: string | null
}

export default function ImageUpload({ onImagenSubida, imagenActual }: Props) {
    const [imagenPreview, setImagenPreview] = useState<string | null>(imagenActual || null)
    const [isPending, startTransition] = useTransition()
    const [errorMsg, setErrorMsg] = useState<string | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (!file) return

        if (!file.type.startsWith('image/')) {
            setErrorMsg("El archivo debe ser una imagen.")
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            setErrorMsg("La imagen no debe superar 5MB.")
            return
        }

        setErrorMsg(null)

        // Preview local
        const reader = new FileReader()
        reader.onload = (e) => {
            setImagenPreview(e.target?.result as string)
        }
        reader.readAsDataURL(file)

        // Subir a Vercel Blob
        startTransition(async () => {
            const formData = new FormData()
            formData.append('imagen', file)

            const res = await subirImagenProducto(formData)

            if (res.success) {
                setImagenPreview(res.url) 
                onImagenSubida(res.url)
                setErrorMsg(null)
            } else {
                setErrorMsg(res.error)
                setImagenPreview(imagenActual || null)
            }
        })
    }

    return (
        <div className="flex flex-col gap-4">

            {errorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                    {errorMsg}
                </div>
            )}

           
            {imagenPreview && (
                <div className="relative w-full h-48 bg-zinc-100 rounded-xl overflow-hidden">
                    <Image
                        src={imagenPreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                    />
                </div>
            )}

            
            <label className="relative">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isPending}
                    className="hidden"
                />
                <div className={`flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-zinc-200 rounded-xl cursor-pointer hover:border-zinc-900 transition-colors ${
                    isPending ? 'opacity-50 cursor-not-allowed' : ''
                }`}>
                    <Upload className="h-4 w-4 text-zinc-400" />
                    <span className="text-sm text-zinc-600">
                        {isPending ? "Subiendo..." : "Selecciona una imagen"}
                    </span>
                </div>
            </label>

            <p className="text-xs text-zinc-500">
                Formatos: JPG, PNG, WebP | Máximo: 5MB
            </p>

        </div>
    )
}