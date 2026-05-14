export type Material = {
    id: number;
    nombre: string;
    enStock: boolean;
}

export type Producto = {
    id: number
    titulo: string
    precio: number
    imagenUrl: string | null
    enStock: boolean // Esto es lo que el admin marca en la BD
    stockReal: boolean // Esta es la validacion de que existan todos los materiales para elaborarlo
    materialesIds: number[]
}