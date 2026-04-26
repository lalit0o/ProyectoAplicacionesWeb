'use client'
import ShopHeader from "../../../components/ShopHeader";
import Footer from "../../../components/Footer";
import Image from 'next/image'
import { useCartStore } from "../../../store/useProductStore";
import MensajeModal from "../../../components/mensajeModal";



export default function ProductUI({ producto }) {
    const agregarAlCarrito = useCartStore((state) => state.agregarAlCarrito);
    const modalOpen = useCartStore((state) => state.modalOpen);
    const setModalOpen = useCartStore((state) => state.setModalOpen);


    return (
        <>
        
            <div className="bg-blue-600 overflow-hidden flex items-center gap-6 p-6 rounded-xl ml-50 mr-50">

                {/* Texto */}
                <div className="flex-1 text-white">
                    <p className="text-xl font-semibold">{producto.titulo}</p>
                    <p className="text-lg">${producto.precio}</p>
                    <p className="text-sm mt-2">{producto.descripcion}</p>

                </div>

                {/* Imagen */}
                <div className="w-40 h-52 relative shrink-0">
                    <Image
                        src={producto.imagen}
                        fill
                        className="object-cover rounded-lg"
                        alt="producto"
                    />
                </div>
                <div>
                    <button type="button" onClick={() => {agregarAlCarrito(producto); setModalOpen(true)}}>Agregar al carrito</button>

                </div>
                <MensajeModal open={modalOpen} onClose={() => setModalOpen(false)}>
                    Producto agregado al carrito ✅
                </MensajeModal>


            </div>



            <Footer />
        </>)
}