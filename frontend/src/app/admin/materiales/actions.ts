'use server'

import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache'


export async function toggleStock(id: number, estadoActual: boolean) {

    try{
    await prisma.material.update({
        where: { id },
        data: { enStock: !estadoActual }

    });

    revalidatePath('/admin/materiales')

    return{success: true};
    }catch(error){
        console.error("Error al intentar cambiar el stock:", error)
        return{success: false, error: "Error al intentar cambiar el stock"};
    }
}

export async function eliminarMaterial(id: number) {
    try{
        await prisma.material.delete({
            where: { id }
        });
        revalidatePath('/admin/materiales')
        return{success: true};
    }catch(error: any){
       if (error.code === 'P2003') {
            return { 
                success: false, 
                error: "No se puede eliminar mientras sea parte de una receta." 
            };
        }
    }
}   


export async function crearMaterial(nombre: string) {
    try {
        await prisma.material.create({
            data: { 
                nombre, 
                enStock: true 
            }
        });
        
        revalidatePath('/admin/materiales');
        return { success: true };
    } catch (error) {
        console.error("Error al intentar crear el material:", error);
        return { success: false, error: "Error al intentar crear el material" };
    }
}

export async function editarMaterial(id: number, formData: FormData) {

    const nombre = formData.get("nombre") as string;
    // const categoria = formData.get("categoria") as string; 

    // Vamos a agregar validaciones para el llenado de nombre.
    try {
        await prisma.material.update({
            where: { id },
            data: { 
                nombre,
                // categoria 
            }
        });
        
        revalidatePath('/admin/materiales');
        return { success: true };
    } catch (error) {
        console.error("Error al intentar editar el material:", error);
        return { success: false, error: "Error al intentar editar el material" };
    }
}