import ShopHeader from "../../../components/ShopHeader";
import ProductUI from "./ProductUI";

type params = {
    id: number
}

type props = {
    params: params
}

interface Articulo {
    id: number;
    titulo: string;
    categoria: string;
    precio: number;
    imagen: string;
    descripcion?: string;
}



export default async function Producto({ params }: props) {

    const articulos: Articulo[] = [
        { id: 1, titulo: "Hola1", categoria: "anillos", precio: 30, imagen: '/vestido.png', descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate." },
        { id: 2, titulo: "Mierda asdseca", categoria: "anillos", precio: 30, imagen: '/vestido.png' },
        { id: 3, titulo: "Mierdarfrrf seca", categoria: "anillos", precio: 30, imagen: '/imagen2.webp' },
        { id: 4, titulo: "Mierdarefgdbrt seca", categoria: "anillos", precio: 30, imagen: '/imagen2.webp' },
        { id: 5, titulo: "Mierdaholaaa seca", categoria: "aretes", precio: 30, imagen: '/imagen2.webp' },
        { id: 6, titulo: "Mierda3232 seca", categoria: "aretes", precio: 30, imagen: '/imagen2.webp' },
        { id: 7, titulo: "Mierda123131 seca", categoria: "aretes", precio: 30, imagen: '/imagen2.webp' },
        { id: 8, titulo: "Mierda412312 seca", categoria: "pulseras", precio: 30, imagen: '/imagen2.webp' },
        { id: 9, titulo: "Mierda1231 seca", categoria: "pulseras", precio: 30, imagen: '/imagen2.webp' },
        { id: 10, titulo: "Mierda44123 seca", categoria: "pulseras", precio: 30, imagen: '/imagen2.webp' },
        { id: 11, titulo: "Mierda 5234423seca", categoria: "chakras", precio: 30, imagen: '/imagen2.webp' },
        { id: 12, titulo: "Mierda 12314413seca", categoria: "chakras", precio: 30, imagen: '/imagen2.webp' },
        { id: 13, titulo: "Mierda2313 seca", categoria: "chakras", precio: 30, imagen: '/imagen2.webp' }];

    const { id } = await params;
    const articulo = articulos.find(art => art.id == id);
    if (!articulo) return <div>Articulo no encontrado</div>



    return <>
        <ShopHeader />
        <ProductUI producto={articulo}></ProductUI></>
}