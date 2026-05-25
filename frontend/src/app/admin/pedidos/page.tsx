import { prisma } from "@/lib/prisma"
import type { Pedido } from "@/types"
import { DataTable } from "@/components/DataTable"
import { columns } from "./columns"

export default async function PedidosAdminPage() {
    const pedidosDB = await prisma.pedido.findMany({
        orderBy: { fechaCreacion: "desc" },
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

    const pedidos: Pedido[] = pedidosDB.map((p) => ({
        id: p.id,
        usuarioId: p.usuarioId,
        usuario: {
            id: p.usuario.id,
            nombre: p.usuario.nombre,
            email: p.usuario.email,
            telefono: p.usuario.telefono
        },
        direccionId: p.direccionId,
        direccion: p.direccion ? {
            id: p.direccion.id,
            usuarioId: p.direccion.usuarioId,
            calle: p.direccion.calle,
            ciudad: p.direccion.ciudad,
            codigoPostal: p.direccion.codigoPostal,
            referencia: p.direccion.referencia
        } : null,
        total: p.total,
        metodoEntrega: p.metodoEntrega as any,
        estadoPedido: p.estadoPedido as any,
        fechaCreacion: p.fechaCreacion,
        finalizado: p.estadoPedido === "ENTREGADO",
        detalles: p.detalles.map((d) => ({
            id: d.id,
            pedidoId: d.pedidoId,
            productoId: d.productoId,
            producto: {
                id: d.producto.id,
                titulo: d.producto.titulo,
                precio: d.producto.precio,
                imagenUrl: d.producto.imagenUrl,
                descripcion: null,
                enStock: d.producto.enStock,
                stockReal: d.producto.enStock,
                materialesIds: [],
                categoriaId: null,
                categoria: null
            },
            cantidadComprada: d.cantidadComprada,
            precioUnitario: d.precioUnitario
        }))
    }))

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">

            <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-100 pb-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-serif text-zinc-900 tracking-tight">
                        Panel de pedidos
                    </h1>
                    <p className="text-zinc-500 text-sm">
                        Gestiona y da seguimiento a los pedidos de{" "}
                        <span className="italic font-medium">Kyanite Artesanal</span>.
                    </p>
                </div>
            </section>

            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <DataTable
                    columns={columns}
                    data={pedidos}
                    searchKey="id"
                />
            </div>

        </div>
    )
}