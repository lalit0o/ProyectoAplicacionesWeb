'use client'

import { useCartStore } from "@/store/useProductStore";


export default function CarritoUI() {

    const carrito = useCartStore((state) => state.carrito);
    const eliminarCarrito = useCartStore((state)=>state.eliminarDelCarrito);

    return (<div className="flex flex-row">
        {carrito.map((art) =>
            <div className="text-2xl text-black">
                <p>{art.titulo}</p>
                <p>{art.precio}</p>
                <button type="button" onClick={()=>eliminarCarrito(art.id)}> </button>

            </div>)}
    </div>)

}