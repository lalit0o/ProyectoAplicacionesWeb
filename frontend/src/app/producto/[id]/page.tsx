import ProductUI from "@/components/ProductUI";
import { notFound } from "next/navigation"; 


interface Articulo {
    id: number;
    titulo: string;
    categoria: string;
    precio: number;
    imagen: string;
    descripcion?: string;
}

type Props = {
    params: Promise<{ id: string }>;
};


async function getArticuloById(id: string): Promise<Articulo | undefined> {
    const articulos: Articulo[] = [
        { id: 1, titulo: "Anillo Gota de Luna", categoria: "anillos", precio: 850, imagen: '/imagen1.webp', descripcion: "Plata de ley con piedra luna auténtica." },
        { id: 2, titulo: "Anillo Karma", categoria: "anillos", precio: 450, imagen: '/imagen1.webp' },
        { id: 3, titulo: "Anillo Selene", categoria: "anillos", precio: 520, imagen: '/imagen1.webp' },
        { id: 5, titulo: "Aretes Amatista", categoria: "aretes", precio: 320, imagen: '/imagen2.webp' },
    
    ];

 
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