'use client'

import { useState } from 'react'
import { materialesService } from '@/services/materiales.service';
import { useRouter } from 'next/navigation';

type Props = {
    id: number;
    initialStock: boolean;
}

export default function MaterialSwitch({ id, initialStock }: Props) {
    const [enStock, setEnStock] = useState(initialStock);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter(); // Para refrescar la página silenciosamente

    const handleToggle = async () => {
        setIsLoading(true);
        const nuevoEstado = !enStock;
        
        try {
            setEnStock(nuevoEstado);
            
            // Petición  a NestJS
            await materialesService.toggleStock(id, nuevoEstado);
            
            // Le decimos a Next.js que revalide los datos del servidor en el fondo
            router.refresh();
        } catch (error) {
            // Si el backend falla  revertimos el botón
            console.error(error);
            setEnStock(!nuevoEstado); 
            alert("Hubo un error al guardar en la base de datos.");
        } finally {
            setIsLoading(false);
        }
    };

   
    return (
        <button
            onClick={handleToggle}
            disabled={isLoading}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 ${
                enStock ? 'bg-zinc-900' : 'bg-zinc-300'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
            <span className="sr-only">Cambiar estado de stock</span>
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-300 ease-in-out ${
                    enStock ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
        </button>
    )
}