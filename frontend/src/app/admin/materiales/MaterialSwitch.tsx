'use client'

import { useState } from 'react'

type Props = {
    id: number;
    initialStock: boolean;
}

export default function MaterialSwitch({ id, initialStock }: Props) {
    // Por ahora, manejamos el estado visualmente en React.
    // En el futuro, aquí llamaremos a NestJS.
    const [enStock, setEnStock] = useState(initialStock);
    const [isLoading, setIsLoading] = useState(false);

    const handleToggle = () => {
        setIsLoading(true);
        
        // Simulamos que tarda medio segundo en ir al servidor
        setTimeout(() => {
            setEnStock(!enStock);
            setIsLoading(false);
        }, 500);
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