'use client'

import ShopHeader from "../../components/ShopHeader";
import Footer from "../../components/Footer";
import Articulo from "../../components/Articulo";
import {useCartStore} from "../../store/useProductStore";



export default function Tienda() {
    const articulos = useCartStore((state)=>state.carrito);

    
    
    return (<div className="min-h-screen">
        <ShopHeader />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 ml-5 mr-5">
            {articulos.map((item) => (
            <Articulo key={item.id} articulo={item} />
        ))}
        </div>



        <Footer />


    </div>)

}