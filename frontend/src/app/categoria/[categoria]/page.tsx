import CategoriaUI from "@/components/CategoriaUI";


interface Articulo {
    id: number;
    titulo: string;
    categoria: string;
    precio: number;
    imagen: string;
    descripcion?: string;
}

type Props = {
    params: Promise<{ categoria: string }>; 
};


async function getByCategoria(categoria: string): Promise<Articulo[]> {
    const articulos: Articulo[] = [
        { id: 1, titulo: "Anillo Gota de Luna", categoria: "anillos", precio: 850, imagen: '/imagen1.webp', descripcion: "Acero inoxidable con piedra luna." },
        { id: 2, titulo: "Anillo Karma", categoria: "anillos", precio: 450, imagen: '/imagen1.webp' },
        { id: 3, titulo: "Anillo Selene", categoria: "anillos", precio: 520, imagen: '/imagen1.webp' },
        { id: 5, titulo: "Aretes Amatista", categoria: "aretes", precio: 320, imagen: '/imagen2.webp' },
        { id: 6, titulo: "Aretes Cuarzo Rosa", categoria: "aretes", precio: 320, imagen: '/imagen2.webp' },
        { id: 8, titulo: "Pulsera Ojo de Tigre", categoria: "pulseras", precio: 600, imagen: '/imagen2.webp' },
        { id: 11, titulo: "Collar Chakra Garganta", categoria: "chakras", precio: 750, imagen: '/imagen2.webp' },
       
    ];

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