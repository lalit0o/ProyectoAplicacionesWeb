import {create} from 'zustand'


interface Articulo {
    id:Number;
    titulo:String;
    categoria:String;
    precio:Number;
    imagen:String;
}


type Store={
    articulos:Articulo[]
    getProductosPorCategoria: (categoria:string)=>Articulo[];

}


export const useProductStore = create<Store>()((set,get)=>({
    articulos: [
    { id: 1, titulo: "Hola1", categoria:"anillos",precio: 30, imagen: 'imagen2.webp' },
    { id: 1, titulo: "caca", categoria: "anillos", precio: 30, imagen: 'imagen2.webp' },
    { id: 2, titulo: "Mierda asdseca", categoria: "anillos", precio: 30, imagen: 'imagen2.webp' },
    { id: 3, titulo: "Mierdarfrrf seca", categoria: "anillos", precio: 30, imagen: 'imagen2.webp' },
    { id: 4, titulo: "Mierdarefgdbrt seca", categoria: "anillos", precio: 30, imagen: 'imagen2.webp' },
    { id: 5, titulo: "Mierdaholaaa seca", categoria: "aretes", precio: 30, imagen: 'imagen2.webp' },
    { id: 6, titulo: "Mierda3232 seca", categoria: "aretes", precio: 30, imagen: 'imagen2.webp' },
    { id: 7, titulo: "Mierda123131 seca", categoria: "aretes", precio: 30, imagen: 'imagen2.webp' },
    { id: 8, titulo: "Mierda412312 seca", categoria: "pulseras", precio: 30, imagen: 'imagen2.webp' },
    { id: 9, titulo: "Mierda1231 seca", categoria: "pulseras", precio: 30, imagen: 'imagen2.webp' },
    { id: 10, titulo: "Mierda44123 seca", categoria: "pulseras", precio: 30, imagen: 'imagen2.webp' },
    { id: 11, titulo: "Mierda 5234423seca", categoria: "chakras", precio: 30, imagen: 'imagen2.webp' },
    { id: 12, titulo: "Mierda 12314413seca", categoria: "chakras", precio: 30, imagen: 'imagen2.webp' },
    { id: 13, titulo: "Mierda2313 seca",categoria:"chakras", precio: 30, imagen: 'imagen2.webp' }],



    getProductosPorCategoria: (categoria) =>{

        return get().articulos.filter(art=>art.categoria==categoria);
        
    }
}))