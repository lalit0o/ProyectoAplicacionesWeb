'use client'
import {use} from "react";
import { useProductStore } from "../../../store/useProductStore";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Articulo from "../../../components/Articulo";
import Submenu from "../../../components/Submenu";


type categorias = "todos" | "anillos" | "collares" | "pulseras" | "aretes";

type props = {
    params: Promise<{categoria: categorias  }>
}

export default function Categoria({ params }: props) {

    const getProductosPorCategoria = useProductStore((state) => state.getProductosPorCategoria);
    const articulosCompletos = useProductStore((state) => state.articulos);

    const { categoria } = use(params);

    const articulos = categoria === "todos" ? articulosCompletos : getProductosPorCategoria(categoria);


    return (<>
        <Header />
        <Submenu />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 ml-5 mr-5">
            {articulos.map((item) => (
                <Articulo key={item.id} articulo={item} />
            ))}
        </div>



        <Footer />
    </>
    );
}