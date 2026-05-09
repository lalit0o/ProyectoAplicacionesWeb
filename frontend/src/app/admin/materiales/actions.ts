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
    }catch(error){
        console.error("Error al intentar eliminar el material:", error)
        return{success: false, error: "Error al intentar eliminar el material"};
    }
}   


export async function crearMaterial(nombre: string, categoria: string) {
    try{
        await prisma.material.create({
            data: { nombre, categoria, enStock: true }
        });
        revalidatePath('/admin/materiales')
        return{success: true};
    }catch(error){
        console.error("Error al intentar crear el material:", error)
        return{success: false, error: "Error al intentar crear el material"};

    }
}