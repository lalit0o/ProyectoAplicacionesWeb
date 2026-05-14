'use server'

import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache'

export async function eliminarProducto(id: number) {
    try {
       const pedidosActivos = await prisma.detallePedido.count({
        where: {productoId: id}
    })
    
    if(pedidosActivos > 0){
        return{
            success: false,
            error: "Este producto tiene pedidos registrados y no puede eliminarse"
        }
    }

    await prisma.producto.delete({
        where: { id }
    })


    revalidatePath('/admin/productos')
    return { success: true }
    } catch (error) {
        console.error("Error al intentar eliminar el producto:", error)
        return { success: false, error: "Error al intentar eliminar el producto" }
    }  
}   


export async function crearProducto(formData: FormData, materialesIds: number[]) {
    const titulo = formData.get("titulo") as string;
    const precio = Number(formData.get("precio"));
    const imagenUrl = formData.get("imagenUrl") as string;

    if(!titulo || titulo.trim() === ""){
        return { success: false, error: "El título es obligatorio." }
    }

    if(isNaN(precio) || precio <= 0){
        return { success: false, error: "El precio debe ser un número positivo." }
    }

    try{
        await prisma.producto.create({
            data:{
                titulo: titulo.trim(),
                precio,
                imagenUrl,
                enStock: true,
                recetas: {
                    create: materialesIds.map(id=> ({
                        material: { connect: { id } }
                    }))
                }
            }
        })
    
        revalidatePath('/admin/productos')
        return { success: true }
    } catch (error){
        console.error("Error al intentar crear el producto:", error)
        return { success: false, error: "Error al intentar crear el producto" }
    }
}


export async function editarProducto(id: number, formData: FormData, materialesIds: number[]) {

    
    const titulo = formData.get("titulo") as string
    const precio = Number(formData.get("precio"))
    const imagenUrl = formData.get("imagenUrl") as string || null

  
    if (!titulo || titulo.trim() === "") {
        return { success: false, error: "El nombre del producto es obligatorio." }
    }

    if (isNaN(precio) || precio <= 0) {
        return { success: false, error: "El precio debe ser un número mayor a cero." }
    }

    try {
        //  deben pasar juntas o no pasar ninguna por si falla alguna regresa a sutado original y no dejar datos inconsistentes
        await prisma.$transaction([

            // se borran los materiales actuales
            prisma.receta.deleteMany({
                where: { productoId: id }
            }),

            // se actualiza el producto con los nuevos materiales
            prisma.producto.update({
                where: { id },
                data: {
                    titulo: titulo.trim(),
                    precio,
                    imagenUrl,
                    recetas: {
                        create: materialesIds.map(idMaterial => ({
                            material: { connect: { id: idMaterial } }
                        }))
                    }
                }
            })

        ])

        revalidatePath('/admin/productos')
        return { success: true }

    } catch (error) {
        console.error("Error al editar el producto:", error)
        return { success: false, error: "Ocurrió un error al editar el producto." }
    }
}