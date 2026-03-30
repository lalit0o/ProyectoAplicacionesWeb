'use client'

import { useProductStore } from "../../../store/useProductStore";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

type params = {
    id: number
}

type props = {
    params: params
}

export default async function Producto({ params }: props) {
    const articulos = useProductStore((state) => state.articulos);
    const { id } = await params;
    const articulo = articulos.find(art => art.id == id);
    return (
        <>
            <Header />
            <div className="flex justify-between items-center flex-row gap-5 bg-blue-100 py-10 px-5 rounded-3xl text-black">
                <div><h1>{articulo.titulo}</h1>
                <p>{articulo.descripcion}</p></div>
                <div>
                    <h1>{articulo.titulo}</h1>
                    <p>{articulo.precio}</p>
                    <p>{articulo.imagen}</p>
                </div>
            </div>

            <Footer />
        </>)
}