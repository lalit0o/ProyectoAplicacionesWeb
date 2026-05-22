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

export type EstadoPedido = "PENDIENTE" | "ACEPTADO" | "ELABORANDO" | "TERMINADO" | "ENVIADO" | "ENTREGADO"

export type DetallePedido = {
    id: number
    pedidoId: number
    productoId: number
    producto: Producto
    cantidadComprada: number
    precioUnitario: number
}

export type Direccion = {
    id: number
    usuarioId: number
    calle: string
    ciudad: string
    codigoPostal: string
    referencia: string | null
}

export type Usuario = {
    id: number
    nombre: string
    email: string
    telefono: string | null
}

export type MetodoEntrega = "PAQUETERIA" | "RECOLECCION"

export type Pedido = {
    id: number
    usuarioId: number
    usuario: Usuario
    direccionId: number | null
    direccion: Direccion | null
    total: number
    metodoEntrega: MetodoEntrega
    estadoPedido: EstadoPedido
    fechaCreacion: Date
    detalles: DetallePedido[]
    finalizado: boolean
}