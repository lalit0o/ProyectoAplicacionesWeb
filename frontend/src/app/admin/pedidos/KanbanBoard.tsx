'use client'

import { useState } from 'react'

// Tipos consistentes con tu lógica de negocio
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
    { id: 'PENDIENTE', titulo: 'Nuevos', color: 'bg-amber-100 text-amber-800 border-amber-200' },
    { id: 'ACEPTADO', titulo: 'Confirmados', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { id: 'ELABORANDO', titulo: 'En Taller', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { id: 'TERMINADO', titulo: 'Listos', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
];

export default function KanbanBoard({ pedidosIniciales }: { pedidosIniciales: Pedido[] }) {
    const [pedidos, setPedidos] = useState<Pedido[]>(pedidosIniciales);

    const avanzarPedido = (pedidoId: number, estadoActual: EstadoPedido) => {
        const indexActual = COLUMNAS.findIndex(c => c.id === estadoActual);
        if (indexActual < COLUMNAS.length - 1) {
            const nuevoEstado = COLUMNAS[indexActual + 1].id;
            // Aquí irá el fetch a NestJS después
            setPedidos(pedidos.map(p => p.id === pedidoId ? { ...p, estado: nuevoEstado } : p));
        }
    };

    return (
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x h-full">
            {COLUMNAS.map((columna) => {
                const pedidosEnColumna = pedidos.filter(p => p.estado === columna.id);

                return (
                    <div key={columna.id} className="min-w-[320px] max-w-[320px] snap-center shrink-0 flex flex-col bg-zinc-50 rounded-2xl border border-zinc-200 p-4 h-full">
                        {/* Cabecera de Columna */}
                        <div className="flex justify-between items-center mb-5">
                            <h3 className="font-serif font-bold text-zinc-900">{columna.titulo}</h3>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${columna.color}`}>
                                {pedidosEnColumna.length}
                            </span>
                        </div>

                        {/* Espacio para Tarjetas */}
                        <div className="flex flex-col gap-4 overflow-y-auto pr-1 custom-scrollbar">
                            {pedidosEnColumna.length === 0 ? (
                                <div className="border-2 border-dashed border-zinc-200 rounded-xl py-10 flex items-center justify-center text-zinc-400 text-xs italic">
                                    No hay pedidos aquí
                                </div>
                            ) : (
                                pedidosEnColumna.map((pedido) => (
                                    <div key={pedido.id} className="bg-white p-4 rounded-xl shadow-sm border border-zinc-200 hover:shadow-md transition-all group">
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="text-[10px] font-mono text-zinc-400">#{pedido.id.toString().padStart(4, '0')}</span>
                                            <span className="text-[10px] font-bold text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded uppercase tracking-tighter">
                                                {pedido.metodoEntrega}
                                            </span>
                                        </div>
                                        
                                        <h4 className="font-bold text-zinc-900 text-sm mb-2">{pedido.cliente}</h4>
                                        
                                        <div className="space-y-1 mb-4">
                                            {pedido.productos.map((prod, i) => (
                                                <div key={i} className="text-xs text-zinc-500 flex items-center gap-1">
                                                    <span className="w-1 h-1 bg-zinc-300 rounded-full" /> {prod}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-2 flex justify-between items-center border-t border-zinc-50 pt-3">
                                            <span className="font-bold text-zinc-900 text-sm">${pedido.total.toFixed(2)}</span>
                                            
                                            {columna.id !== 'TERMINADO' && (
                                                <button 
                                                    onClick={() => avanzarPedido(pedido.id, pedido.estado)}
                                                    className="text-[10px] font-bold text-white bg-zinc-900 hover:bg-zinc-800 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 shadow-sm"
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