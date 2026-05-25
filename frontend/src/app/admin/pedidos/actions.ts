'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function cambiarEstadoPedido(id: number, nuevoEstado: string) {
    try {
        await prisma.pedido.update({
            where: { id },
            data: { estadoPedido: nuevoEstado as any }
        })

        revalidatePath('/admin/pedidos')
        revalidatePath(`/admin/pedidos/${id}`)
        return { success: true }

    } catch (error) {
        console.error("Error al cambiar estado del pedido:", error)
        return { success: false, error: "Ocurrió un error al cambiar el estado." }
    }
}