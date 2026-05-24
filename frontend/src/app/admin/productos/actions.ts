'use server'

import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache'
import { put, del } from '@vercel/blob'

export async function eliminarProducto(id: number) {
    try {
        
        const pedidosEnCurso = await prisma.detallePedido.count({
            where: {
                productoId: id,
                pedido: {
                    estadoPedido: {
                        not: "ENTREGADO"
                    }
                }
            }
        })

        if (pedidosEnCurso > 0) {
            return {
                success: false,
                error: `Este producto tiene ${pedidosEnCurso} pedido(s) en curso. No puede eliminarse hasta que se entreguen.`
            }
        }

      
        await prisma.producto.delete({
            where: { id }
        })

        revalidatePath('/admin/productos')
        return { success: true }

    } catch (error) {
        console.error("Error al eliminar producto:", error)
        return { success: false, error: "Error al eliminar el producto." }
    }
}

export async function crearProducto(formData: FormData, materialesIds: number[]) {
    const titulo = formData.get("titulo") as string
    const precio = Number(formData.get("precio"))
    const imagenUrl = formData.get("imagenUrl") as string || null
    const descripcion = formData.get("descripcion") as string || null
    const categoriaId = formData.get("categoriaId") as string

    if (!titulo || titulo.trim() === "") {
        return { success: false, error: "El nombre del producto es obligatorio." }
    }

    if (isNaN(precio) || precio <= 0) {
        return { success: false, error: "El precio debe ser un número mayor a cero." }
    }

    try {
        await prisma.producto.create({
            data: {
                titulo: titulo.trim(),
                precio,
                imagenUrl,
                descripcion: descripcion?.trim() || null,
                enStock: true,
                categoriaId: categoriaId ? Number(categoriaId) : null,
                recetas: {
                    create: materialesIds.map(id => ({
                        material: { connect: { id } }
                    }))
                }
            }
        })

        revalidatePath('/admin/productos')
        return { success: true }

    } catch (error) {
        console.error("Error al crear el producto:", error)
        return { success: false, error: "Ocurrió un error al crear el producto." }
    }
}


export async function editarProducto(id: number, formData: FormData, materialesIds: number[]) {

    
    const titulo = formData.get("titulo") as string
    const precio = Number(formData.get("precio"))
    const imagenUrl = formData.get("imagenUrl") as string || null
    const descripcion = formData.get("descripcion") as string || null
    const categoriaId = formData.get("categoriaId") as string

  
    if (!titulo || titulo.trim() === "") {
        return { success: false, error: "El nombre del producto es obligatorio." }
    }

    if (isNaN(precio) || precio <= 0) {
        return { success: false, error: "El precio debe ser un número mayor a cero." }
    }

    try {
        //  deben pasar juntas o no pasar ninguna por si falla alguna regresa a su estado original y no dejar datos inconsistentes
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
                    descripcion: descripcion?.trim() || null,
                    categoriaId: categoriaId ? Number(categoriaId) : null,
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


    export async function crearCategoriaProducto(formData: FormData) {
        const nombre = formData.get("nombre") as string

        if (!nombre || nombre.trim() === "") {
            return { success: false, error: "El nombre de la categoría es obligatorio." }
        }

        try {
            await prisma.categoriaProducto.create({
                data: { nombre: nombre.trim() }
            })

            revalidatePath('/admin/productos')
            return { success: true }

        } catch (error: any) {
            if (error.code === 'P2002') {
                return { success: false, error: "Ya existe una categoría con ese nombre." }
            }

            console.error("Error al crear categoría de producto:", error)
            return { success: false, error: "Ocurrió un error al crear la categoría." }
        }
    }

    export async function editarCategoriaProducto(id: number, formData: FormData) {
        const nombre = formData.get("nombre") as string

        if (!nombre || nombre.trim() === "") {
            return { success: false, error: "El nombre de la categoría es obligatorio." }
        }

        try {
            await prisma.categoriaProducto.update({
                where: { id },
                data: { nombre: nombre.trim() }
            })

            revalidatePath('/admin/productos')
            return { success: true }

        } catch (error: any) {
            if (error.code === 'P2002') {
                return { success: false, error: "Ya existe una categoría con ese nombre." }
            }

            console.error("Error al editar categoría de producto:", error)
            return { success: false, error: "Ocurrió un error al editar la categoría." }
        }
    }

    export async function eliminarCategoriaProducto(id: number) {
        try {
            const productosAsignados = await prisma.producto.count({
                where: { categoriaId: id }
            })

            if (productosAsignados > 0) {
                return {
                    success: false,
                    error: `Esta categoría tiene ${productosAsignados} producto(s) asignados. Reasígnalos antes de eliminarla.`
                }
            }

            await prisma.categoriaProducto.delete({ where: { id } })
            revalidatePath('/admin/productos')
            return { success: true }

        } catch (error) {
            console.error("Error al eliminar categoría de producto:", error)
            return { success: false, error: "Ocurrió un error al eliminar la categoría." }
        }
    }

export async function subirImagenProducto(formData: FormData) {
    try {
        const file = formData.get('imagen') as File

        if (!file) {
            return { success: false, error: "No se seleccionó ninguna imagen." }
        }

        if (!file.type.startsWith('image/')) {
            return { success: false, error: "El archivo debe ser una imagen." }
        }

        if (file.size > 5 * 1024 * 1024) {
            return { success: false, error: "La imagen no debe superar 5MB." }
        }

        const bytes = await file.arrayBuffer()
        
        const blob = await put(`productos/${Date.now()}-${file.name}`, bytes, {
            access: 'public',
            contentType: file.type
        })

        revalidatePath('/admin/productos')
        
        return { success: true, url: blob.url }

    } catch (error) {
        console.error("Error al subir imagen:", error)
        return { success: false, error: "Error al subir la imagen." }
    }
}

export async function eliminarImagenProducto(url: string) {
    try {
       
        return { success: true }
    } catch (error) {
        console.error("Error al eliminar imagen:", error)
        return { success: false }
    }
}