export function calcularStockReal(producto:{
    enStock: boolean;
    recetas:{
        material: {
            enStock: boolean;
        }
        }[]
    
}): boolean {

    if(!producto.enStock) return false

    const faltaMaterial = producto.recetas.some(
        (item) => item.material.enStock === false
    )

    return !faltaMaterial
}