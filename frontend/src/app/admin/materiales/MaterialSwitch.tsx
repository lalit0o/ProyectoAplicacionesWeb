'use client'

import { startTransition, useState, useTransition } from 'react'
import {toggleStock}  from './actions'

type Props = {
    id: number;
    initialStock: boolean;
}

export default function MaterialSwitch({ id, initialStock }: Props) {
    const [enStock, setEnStock] = useState(initialStock); // Estado local para reflejar el cambio inmediatamente

    const [isPending, startTransition] = useTransition();

    const handleToggle = async () => {
      
        const estadoPrevio = enStock;

        setEnStock(!estadoPrevio) // Cambiamos el estado local inmediatamente para una mejor UX

        startTransition(async () => {
            const result = await toggleStock(id, estadoPrevio); // Llamamos a la función del servidor para actualizar el stock
            if (!result.success) {
                setEnStock(estadoPrevio); // Si hubo un error, revertimos el estado local
                alert(result.error || "Error al cambiar el estado de stock");
            }
        });
    };

   
    return (
        <button
            type="button"
            role="switch"
            aria-checked={enStock}
            onClick={handleToggle}
            disabled={isPending}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
                transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2
                ${enStock ? 'bg-zinc-900' : 'bg-zinc-200'}
                ${isPending ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}
            `}
        >
            <span className="sr-only">Toggle stock</span>
            <span
                className={`
                    pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
                    transition duration-200 ease-in-out
                    ${enStock ? 'translate-x-5' : 'translate-x-0'}
                `}
            />
        </button>
    )
}