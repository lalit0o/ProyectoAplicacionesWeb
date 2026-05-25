import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import PedidoDetalle from "../PedidoDetalle"
import type { Pedido } from "@/types"

type Props = {
    params: Promise<{ id: string }>
}

export default async function PedidoDetallePagePage({ params }: Props) {
    const { id } = await params
    const pedidoId = parseInt(id)

    const pedidoDB = await prisma.pedido.findUnique({
        where: { id: pedidoId },
        include: {
            usuario: true,
            direccion: true,
            detalles: {
                include: {
                    producto: true
                }
            }
        }
    })

    if (!pedidoDB) {
        notFound()
    }

    const pedido: Pedido = {
        id: pedidoDB.id,
        usuarioId: pedidoDB.usuarioId,
        usuario: {
            id: pedidoDB.usuario.id,
            nombre: pedidoDB.usuario.nombre,
            email: pedidoDB.usuario.email,
            telefono: pedidoDB.usuario.telefono
        },
        direccionId: pedidoDB.direccionId,
        direccion: pedidoDB.direccion ? {
            id: pedidoDB.direccion.id,
            usuarioId: pedidoDB.direccion.usuarioId,
            calle: pedidoDB.direccion.calle,
            ciudad: pedidoDB.direccion.ciudad,
            codigoPostal: pedidoDB.direccion.codigoPostal,
            referencia: pedidoDB.direccion.referencia
        } : null,
        total: pedidoDB.total,
        metodoEntrega: pedidoDB.metodoEntrega as any,
        estadoPedido: pedidoDB.estadoPedido as any,
        fechaCreacion: pedidoDB.fechaCreacion,
        detalles: pedidoDB.detalles.map((d) => ({
            id: d.id,
            pedidoId: d.pedidoId,
            productoId: d.productoId,
            producto: {
                id: d.producto.id,
                titulo: d.producto.titulo,
                precio: d.producto.precio,
                imagenUrl: d.producto.imagenUrl,
                enStock: d.producto.enStock,
                stockReal: d.producto.enStock,
                materialesIds: [],
                categoriaId: null,
                categoria: null
            },
            cantidadComprada: d.cantidadComprada,
            precioUnitario: d.precioUnitario
        }))
    }

    return <PedidoDetalle pedido={pedido} />
}