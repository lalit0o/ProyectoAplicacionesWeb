import CategoriaUI from "@/components/CategoriaUI";


async function getAllArticulos() {
    return [
        { id: 1, titulo: "Anillo Gota de Luna", categoria: "anillos", precio: 850, imagen: '/imagen1.webp' },
        { id: 2, titulo: "Collar Amatista", categoria: "collares", precio: 1200, imagen: '/imagen2.webp' },
        { id: 5, titulo: "Aretes Cuarzo", categoria: "aretes", precio: 350, imagen: '/imagen2.webp' },
        { id: 8, titulo: "Pulsera Ojo de Tigre", categoria: "pulseras", precio: 600, imagen: '/imagen2.webp' },
        
    ];
}

export default async function TiendaPage() {

    const productos = await getAllArticulos();

    return (
        <CategoriaUI 
            articulos={productos} 
            tituloCategoria="Catálogo Completo" 
        />
    );
}