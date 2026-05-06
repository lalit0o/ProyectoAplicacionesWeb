'use client'

import { useState } from 'react'

// Tipos basados en tu esquema de Prisma
type EstadoPedido = 'PENDIENTE' | 'ACEPTADO' | 'ELABORANDO' | 'TERMINADO' | 'ENVIADO' | 'ENTREGADO';

type Pedido = {
    id: number;
    cliente: string;
    total: number;
    metodoEntrega: 'PAQUETERIA' | 'RECOLECCION';
    estado: EstadoPedido;
    productos: string[];
}

const COLUMNAS: { id: EstadoPedido; titulo: string; color: string }[] = [
    { id: 'PENDIENTE', titulo: 'Nuevos', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { id: 'ACEPTADO', titulo: 'Por Iniciar', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { id: 'ELABORANDO', titulo: 'En Taller', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { id: 'TERMINADO', titulo: 'Listos', color: 'bg-green-100 text-green-800 border-green-200' },
];

export default function KanbanBoard({ pedidosIniciales }: { pedidosIniciales: Pedido[] }) {
    const [pedidos, setPedidos] = useState<Pedido[]>(pedidosIniciales);

    // Función para avanzar el pedido a la siguiente etapa
    const avanzarPedido = (pedidoId: number, estadoActual: EstadoPedido) => {
        const indexActual = COLUMNAS.findIndex(c => c.id === estadoActual);
        if (indexActual < COLUMNAS.length - 1) {
            const nuevoEstado = COLUMNAS[indexActual + 1].id;
            
            // Aquí en el futuro harás el fetch() a NestJS
            // fetch(`/api/pedidos/${pedidoId}/estado`, { method: 'PATCH', body: JSON.stringify({ estado: nuevoEstado }) })
            
            // Actualización visual inmediata (Optimistic UI)
            setPedidos(pedidos.map(p => p.id === pedidoId ? { ...p, estado: nuevoEstado } : p));
        }
    };

    return (
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x">
            {COLUMNAS.map((columna) => {
                const pedidosEnColumna = pedidos.filter(p => p.estado === columna.id);

                return (
                    <div key={columna.id} className="min-w-[320px] max-w-[320px] snap-center shrink-0 flex flex-col bg-zinc-50/50 rounded-xl border border-zinc-200 p-4">
                        
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-zinc-700">{columna.titulo}</h3>
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${columna.color}`}>
                                {pedidosEnColumna.length}
                            </span>
                        </div>

                    
                        <div className="flex flex-col gap-3 h-full min-h-[150px]">
                            {pedidosEnColumna.length === 0 ? (
                                <div className="border-2 border-dashed border-zinc-200 rounded-lg h-full flex items-center justify-center text-zinc-400 text-sm">
                                    Sin pedidos
                                </div>
                            ) : (
                                pedidosEnColumna.map((pedido) => (
                                    <div key={pedido.id} className="bg-white p-4 rounded-lg shadow-sm border border-zinc-200 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-mono text-zinc-400">#{pedido.id.toString().padStart(4, '0')}</span>
                                            <span className="text-xs font-medium text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">
                                                {pedido.metodoEntrega}
                                            </span>
                                        </div>
                                        <h4 className="font-medium text-zinc-900">{pedido.cliente}</h4>
                                        <div className="mt-2 text-sm text-zinc-500">
                                            {pedido.productos.map((prod, i) => <div key={i}>• {prod}</div>)}
                                        </div>
                                        <div className="mt-4 flex justify-between items-center border-t border-zinc-100 pt-3">
                                            <span className="font-bold text-zinc-900">${pedido.total.toFixed(2)}</span>
                                            
                                           
                                            {columna.id !== 'TERMINADO' && (
                                                <button 
                                                    onClick={() => avanzarPedido(pedido.id, pedido.estado)}
                                                    className="text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 px-3 py-1.5 rounded-md transition-colors"
                                                >
                                                    Avanzar →
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}