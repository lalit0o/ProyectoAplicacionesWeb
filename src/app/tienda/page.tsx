'use client'

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Articulo from "../../components/Articulo";
import {useProductStore} from "../../store/useProductStore";
import Submenu from "../../components/Submenu";



export default function Tienda() {
    const articulos = useProductStore((state)=>state.articulos);

    
    
    return (<div className="min-h-screen">
        <Header />
        <Submenu />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 ml-5 mr-5">
            {articulos.map((item) => (
            <Articulo key={item.id} articulo={item} />
        ))}
        </div>



        <Footer />


    </div>)

}