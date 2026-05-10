'use server'

import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache'

export async function eliminarProducto(id: number) {
    try {
        await prisma.producto.delete({
            where: { id }
        });
        revalidatePath('/admin/productos')
        return { success: true };
    } catch (error) {
        console.error("Error al intentar eliminar el producto:", error)
        return { success: false, error: "Error al intentar eliminar el producto" };
    }
}   


export async function crearProducto(titulo: string, imagenUrl: string, precio: number, materialesIds: number[]) {
    try {
        await prisma.producto.create({
            data: { 
                titulo, 
                precio,
                imagenUrl,
                enStock: true, 
                recetas: {
                    create: materialesIds.map(id => ({
                        material: { connect: { id } }
                    }))
                }
            }
        });
        
        revalidatePath('/admin/productos');
        return { success: true };
    } catch (error) {
        console.error("Error al intentar crear el producto:", error);
        return { success: false, error: "Error al intentar crear el producto" };
    }
}

export async function editarProducto(id: number, formData: FormData, materialesIds: number[]) {
   
    const titulo = formData.get("nombre") as string; 
    const precio = Number(formData.get("precio"));
    const imagenUrl = formData.get("imagenUrl") as string;
   
    try {
        await prisma.producto.update({
            where: { id },
            data: { 
                titulo,
                precio,
                imagenUrl, 
                recetas: {
                    deleteMany: {}, 
                    create: materialesIds.map(idMaterial => ({
                        material: { connect: { id: idMaterial } }
                    }))
                }
            }
        });
        
        revalidatePath('/admin/productos');
        return { success: true };
    } catch (error) {
        console.error("Error al intentar editar el producto:", error);
        return { success: false, error: "Error al intentar editar el producto" };
    }
}