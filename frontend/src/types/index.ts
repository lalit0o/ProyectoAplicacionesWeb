export type Material = {
    id: number;
    nombre: string;
    enStock: boolean;
    categoriaId: number | null     
    categoria: CategoriaMaterial | null  // el objeto completo de la categoría
}

export type Producto = {
    id: number
    titulo: string
    precio: number
    imagenUrl: string | null
    enStock: boolean // Esto es lo que el admin marca en la BD
    stockReal: boolean // Esta es la validacion de que existan todos los materiales para fabricar el producto
    materialesIds: number[]
    categoriaId: number | null          
    categoria: CategoriaProducto | null 
}

export type CategoriaProducto = {
    id: number
    nombre: string
}

export type CategoriaMaterial = {
    id: number
    nombre: string

}