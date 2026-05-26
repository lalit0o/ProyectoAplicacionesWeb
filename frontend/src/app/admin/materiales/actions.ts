'use server' 

import { prisma } from "@/lib/prisma"
import { revalidatePath } from 'next/cache' 


export async function crearMaterial(formData: FormData) {
    const nombre = formData.get("nombre") as string 
    const categoriaId = formData.get("categoriaId") as string

    if (!nombre || nombre.trim() === "") {
        return { success: false, error: "El nombre del material es obligatorio." }
    }

    try {
        await prisma.material.create({
            data: {
                nombre: nombre.trim(),
                categoriaId: categoriaId ? Number(categoriaId) : null
            }
        })

        revalidatePath('/admin/materiales')
        return { success: true }

    } catch (error) {
        console.error("Error al crear material:", error)
        return { success: false, error: "Ocurrió un error al crear el material." }
    }
}

export async function editarMaterial(id: number, formData: FormData) {
    const nombre = formData.get("nombre") as string
    const categoriaId = formData.get("categoriaId") as string

    if (!nombre || nombre.trim() === "") {
        return { success: false, error: "El nombre del material es obligatorio." }
    }

    try {
        await prisma.material.update({
            where: { id },
            data: {
                nombre: nombre.trim(),
                categoriaId: categoriaId ? Number(categoriaId) : null
            }
        })

        revalidatePath('/admin/materiales')
        return { success: true }

    } catch (error) {
        console.error("Error al editar material:", error)
        return { success: false, error: "Ocurrió un error al editar el material." }
    }
}

export async function eliminarMaterial(id: number) {
    try {
        const recetasAsignadas = await prisma.receta.count({
            where: { materialId: id }
        })

        if (recetasAsignadas > 0) {
            return {
                success: false,
                error: "Quítalo de las recetas antes de eliminarlo."
            }
        }

        await prisma.material.delete({ where: { id } })
        revalidatePath('/admin/materiales')
        return { success: true }

    } catch (error) {
        console.error("Error al eliminar material:", error)
        return { success: false, error: "Ocurrió un error al eliminar el material." }
    }
}

export async function toggleStock(id: number, estadoActual: boolean) {
    try {
        await prisma.material.update({
            where: { id },
            data: { enStock: !estadoActual }
        })

        revalidatePath('/admin/materiales')
        return { success: true }

    } catch (error) {
        console.error("Error al cambiar el stock:", error)
        return { success: false, error: "Error al cambiar el estado de stock." }
    }
}


export async function crearCategoriaMaterial(formData: FormData) {
    const nombre = formData.get("nombre") as string

    if (!nombre || nombre.trim() === "") {
        return { success: false, error: "El nombre de la categoría es obligatorio." }
    }

    try {
        await prisma.categoriaMaterial.create({
            data: { nombre: nombre.trim() }
        })

        revalidatePath('/admin/materiales')
        return { success: true }

    } catch (error: any) {
        if (error.code === 'P2002') {
            return { success: false, error: "Ya existe una categoría con ese nombre." }
        }

        console.error("Error al crear categoría de material:", error)
        return { success: false, error: "Ocurrió un error al crear la categoría." }
    }
}

export async function editarCategoriaMaterial(id: number, formData: FormData) {
    const nombre = formData.get("nombre") as string

    if (!nombre || nombre.trim() === "") {
        return { success: false, error: "El nombre de la categoría es obligatorio." }
    }

    try {
        await prisma.categoriaMaterial.update({
            where: { id },
            data: { nombre: nombre.trim() }
        })

        revalidatePath('/admin/materiales')
        return { success: true }

    } catch (error: any) {
        if (error.code === 'P2002') {
            return { success: false, error: "Ya existe una categoría con ese nombre." }
        }

        console.error("Error al editar categoría de material:", error)
        return { success: false, error: "Ocurrió un error al editar la categoría." }
    }
}

export async function eliminarCategoriaMaterial(id: number) {
    try {
        const materialesAsignados = await prisma.material.count({
            where: { categoriaId: id }
        })

        if (materialesAsignados > 0) {
            return {
                success: false,
                error: `Esta categoría tiene ${materialesAsignados} material(es) asignado(s). Reasígnalos antes de eliminarla.`
            }
        }

        await prisma.categoriaMaterial.delete({ where: { id } })
        revalidatePath('/admin/materiales')
        return { success: true }

    } catch (error) {
        console.error("Error al eliminar categoría de material:", error)
        return { success: false, error: "Ocurrió un error al eliminar la categoría." }
    }
}