import CategoriaUI from "@/components/CategoriaUI";
import { obtenerArticulos } from "@/lib/articulos";


interface Articulo {
    id:number;
    titulo:string;
    precio:number;
    imagenUrl?:string;
    enStock:boolean;
    categoria?:string;
    categoriaId?:number;
}

type Props = {
    params: Promise<{ categoria: string }>; 
};


async function getByCategoria(categoria: string): Promise<Articulo[]> {
    const articulos: Articulo[] = await obtenerArticulos();

    if (categoria === "todos") return articulos;
    return articulos.filter(art => art.categoria === categoria);
}

export default async function CategoriaPage({ params }: Props) {
    
    const { categoria } = await params;
    
   
    const articulos = await getByCategoria(categoria);

 
    return (
        <CategoriaUI 
            articulos={articulos} 
            tituloCategoria={categoria === "todos" ? "Colección Completa" : categoria} 
        />
    );
}