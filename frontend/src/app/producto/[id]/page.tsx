import ProductUI from "@/components/ProductUI";
import { notFound } from "next/navigation";
import { obtenerArticulos } from "@/lib/articulos"


interface Articulo {
    id: number;
    titulo: string;
    descripcion:string;
    precio: number;
    imagenUrl?: string;
    enStock: boolean;
    categoria?: string;
    categoriaId?: number;
}

type Props = {
    params: Promise<{ id: string }>;
};


async function getArticuloById(id: string): Promise<Articulo | undefined> {
    const articulos = await obtenerArticulos();


    return articulos.find(art => art.id == Number(id));
}


export default async function ProductPage({ params }: Props) {

    const { id } = await params;


    const articulo = await getArticuloById(id);


    if (!articulo) {
        notFound();
    }


    return <ProductUI producto={articulo} />;
}