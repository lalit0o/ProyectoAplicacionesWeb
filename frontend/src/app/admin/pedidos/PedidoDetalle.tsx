'use client'

import { useState, useTransition } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ModalKyanite from "@/components/ModalKyanite"
import CambiarEstadoForm from "./CambiarEstadoForm"
import type { Pedido, EstadoPedido } from "@/types"

interface Props {
    pedido: Pedido
}

export default function PedidoDetalle({ pedido }: Props) {
    const [modalActivo, setModalActivo] = useState(false)
    const [isPending, startTransition] = useTransition()

    const estadoActual = pedido.estadoPedido

    return (
        <div className="p-8 space-y-8 max-w-4xl mx-auto">

            <Link href="/admin/pedidos" className="flex items-center gap-2 text-blue-600 hover:underline">
                <ArrowLeft className="h-4 w-4" />
                Volver a pedidos
            </Link>

            <section className="border-b border-zinc-100 pb-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-serif text-zinc-900">
                            Pedido #{pedido.id}
                        </h1>
                        <p className="text-zinc-500 text-sm mt-2">
                            {new Date(pedido.fechaCreacion).toLocaleDateString("es-MX", {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            })}
                        </p>
                    </div>
                    <Button
                        onClick={() => setModalActivo(true)}
                        disabled={estadoActual === "ENTREGADO"}  
                        className={`${estadoActual === "ENTREGADO" ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {estadoActual === "ENTREGADO" ? 'Pedido finalizado' : 'Cambiar estado'}
                    </Button>
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              
                <div className="border border-zinc-200 rounded-xl p-6">
                    <h2 className="text-lg font-bold text-zinc-900 mb-4">Cliente</h2>
                    <div className="space-y-2 text-sm">
                        <p><span className="font-semibold">Nombre:</span> {pedido.usuario.nombre}</p>
                        <p><span className="font-semibold">Email:</span> {pedido.usuario.email}</p>
                        <p><span className="font-semibold">Teléfono:</span> {pedido.usuario.telefono || "N/A"}</p>
                    </div>
                </div>

            
                <div className="border border-zinc-200 rounded-xl p-6">
                    <h2 className="text-lg font-bold text-zinc-900 mb-4">Dirección de envío</h2>
                    <div className="space-y-2 text-sm">
                        <p><span className="font-semibold">Calle:</span> {pedido.direccion?.calle || "N/A"}</p>
                        <p><span className="font-semibold">Ciudad:</span> {pedido.direccion?.ciudad || "N/A"}</p>
                        <p><span className="font-semibold">Código postal:</span> {pedido.direccion?.codigoPostal || "N/A"}</p>
                        <p><span className="font-semibold">Referencia:</span> {pedido.direccion?.referencia || "Ninguna"}</p>
                    </div>
                </div>

               
                <div className="border border-zinc-200 rounded-xl p-6">
                    <h2 className="text-lg font-bold text-zinc-900 mb-4">Estado actual</h2>
                    <div className="space-y-2">
                        <p className="text-sm text-zinc-600">Método de entrega: <span className="font-semibold">{pedido.metodoEntrega}</span></p>
                        <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${
                            estadoActual === "ENTREGADO" ? "bg-emerald-100 text-emerald-700" :
                            estadoActual === "ENVIADO" ? "bg-indigo-100 text-indigo-700" :
                            estadoActual === "TERMINADO" ? "bg-green-100 text-green-700" :
                            estadoActual === "ELABORANDO" ? "bg-purple-100 text-purple-700" :
                            estadoActual === "ACEPTADO" ? "bg-blue-100 text-blue-700" :
                            "bg-yellow-100 text-yellow-700"
                        }`}>
                            {estadoActual}
                        </span>
                    </div>
                </div>

             
                <div className="border border-zinc-200 rounded-xl p-6">
                    <h2 className="text-lg font-bold text-zinc-900 mb-4">Total</h2>
                    <p className="text-3xl font-bold text-zinc-900">
                        {new Intl.NumberFormat("es-MX", {
                            style: "currency",
                            currency: "MXN"
                        }).format(pedido.total)}
                    </p>
                </div>

            </div>

           
            <div className="border border-zinc-200 rounded-xl p-6">
                <h2 className="text-lg font-bold text-zinc-900 mb-6">Productos</h2>
                <div className="space-y-4">
                    {pedido.detalles.map((detalle) => (
                        <div key={detalle.id} className="flex justify-between items-center border-b border-zinc-100 pb-4 last:border-0">
                            <div>
                                <p className="font-medium text-zinc-900">{detalle.producto.titulo}</p>
                                <p className="text-sm text-zinc-600">Cantidad: {detalle.cantidadComprada}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium text-zinc-900">
                                    {new Intl.NumberFormat("es-MX", {
                                        style: "currency",
                                        currency: "MXN"
                                    }).format(detalle.precioUnitario * detalle.cantidadComprada)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

           
            <ModalKyanite
                open={modalActivo}
                onClose={() => setModalActivo(false)}
                titulo="Cambiar estado del pedido"
                variant="formulario"
            >
                <CambiarEstadoForm
                    pedidoId={pedido.id}
                    estadoActual={estadoActual}
                    onSuccess={() => setModalActivo(false)}
                />
            </ModalKyanite>

        </div>
    )
}