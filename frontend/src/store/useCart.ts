import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/useProductStore'

export const useCart = () => {
    const [hydrated, setHydrated] = useState(false)
    const cart = useCartStore()

    useEffect(() => {
        setHydrated(true)
    }, [])

    return hydrated ? cart : { ...cart, carrito: [] }
}