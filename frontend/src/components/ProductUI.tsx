'use client'

import Image from 'next/image'
import { ShoppingBag } from 'lucide-react'
import { useCartStore } from "@/store/useProductStore";
import MensajeModal from "@/components/ModalKyanite";
import { Button } from "@/components/ui/button";


type ProductoType = {
    id: number;
    titulo: string;
    precio: number;
    imagen: string;
    descripcion?: string;
    piedra?: string;
    categoria: string;
}

export default function ProductUI({ producto }: { producto: ProductoType }) {

    const agregarAlCarrito = useCartStore((state) => state.agregarAlCarrito);
    const modalOpen = useCartStore((state) => state.modalOpen);
    const setModalOpen = useCartStore((state) => state.setModalOpen);

    const handleAgregar = () => {
        agregarAlCarrito(producto);
        setModalOpen(true);
    };

    return (

        <main className="container mx-auto px-4 py-12 md:py-24">


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">


                <div className="relative aspect-square w-full bg-zinc-50 rounded-sm overflow-hidden">
                    <Image
                        src={producto.imagen || '/vestido.png'}
                        fill
                        sizes="(max-width: 9504px) 100vw, 50vw"
                        className="object-cover"
                        alt={`Fotografía detallada de ${producto.titulo}`}
                        priority
                    />
                </div>


                <div className="flex flex-col pt-4 lg:pt-12">


                    <h1 className="text-4xl md:text-5xl font-serif text-zinc-900 mb-4">
                        {producto.titulo}
                    </h1>
                    <p className="text-2xl font-medium text-zinc-700 mb-8">
                        ${producto.precio.toFixed(2)} MXN
                    </p>

                    <hr className="border-zinc-200 mb-8" />


                    <div className="prose prose-zinc mb-12">
                        <p className="text-zinc-600 leading-relaxed text-lg">
                            {producto.descripcion || "Descripción del artículo."}
                        </p>
                    </div>


                    <div className="mt-auto">
                        <Button
                            onClick={handleAgregar}
                            className="w-full md:w-auto text-lg py-7 px-12 bg-zinc-900 text-white hover:bg-zinc-800 transition-all flex items-center justify-center gap-3"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            Añadir al Carrito
                        </Button>
                    </div>


                    <MensajeModal
                        open={modalOpen} 
                        onClose={() => setModalOpen(false)}
                        variant="anuncio" 
                        titulo="¡Añadido con éxito!"
                    >
                        <p className="text-zinc-600">
                            {producto.titulo} se ha guardado en tu carrito.
                        </p>
                    </MensajeModal>

                </div>
            </div>
        </main>
    );
}