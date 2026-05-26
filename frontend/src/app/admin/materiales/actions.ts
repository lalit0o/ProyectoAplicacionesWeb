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
        const nuevoEstado = !estadoActual;

        // 1. Actualizamos el estado del material en la base de datos
        await prisma.material.update({
            where: { id },
            data: { enStock: nuevoEstado }
        })

        // 2. REACCIÓN EN CADENA: Actualización automática de productos
        if (!nuevoEstado) {
            // A) Si el material se AGOTÓ, apagamos todos los productos que lo usen en su receta
            await prisma.producto.updateMany({
                where: {
                    recetas: { some: { materialId: id } } 
                },
                data: { enStock: false }
            });
        } else {
            // B) Si el material VOLVIÓ, buscamos los productos que lo usan
            const productosAfectados = await prisma.producto.findMany({
                where: {
                    recetas: { some: { materialId: id } }
                },
                include: {
                    recetas: {
                        include: {
                            material: true // Traemos el estado actual de cada material de la receta
                        }
                    }
                }
            });

            // Revisamos uno por uno si ya tienen TODO lo necesario para fabricarse
            for (const producto of productosAfectados) {
                const listoParaArmar = producto.recetas.every(r => r.material.enStock === true);
                
                if (listoParaArmar) {
                    await prisma.producto.update({
                        where: { id: producto.id },
                        data: { enStock: true }
                    });
                }
            }
        }

        // 3. Limpiamos la caché para que el panel admin y la tienda se actualicen al instante
        revalidatePath('/admin/materiales')
        revalidatePath('/categoria/[categoria]', 'layout') 

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