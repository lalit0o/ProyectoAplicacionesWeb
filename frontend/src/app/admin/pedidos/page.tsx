import KanbanBoard from "./KanbanBoard";


const mockPedidos: any[] = [
    { id: 101, cliente: "Ana Martínez", total: 1200, metodoEntrega: "PAQUETERIA", estado: "PENDIENTE", productos: ["1x Collar Amatista", "1x Anillo Luna"] },
    { id: 102, cliente: "Carlos Ruiz", total: 450, metodoEntrega: "RECOLECCION", estado: "PENDIENTE", productos: ["1x Pulsera Cuarzo Amatista"] },
    { id: 103, cliente: "Sofia Castro", total: 850, metodoEntrega: "PAQUETERIA", estado: "ACEPTADO", productos: ["2x Aretes Gota"] },
    { id: 104, cliente: "Laura Gómez", total: 2100, metodoEntrega: "RECOLECCION", estado: "ELABORANDO", productos: ["1x Set Personalizado"] },
];

export default function PedidosPage() {
    return (
        <div className="p-8 h-[calc(100vh-64px)] flex flex-col">
            <header className="mb-6 flex justify-between items-end shrink-0">
                <div>
                    <h1 className="text-3xl font-serif text-zinc-900 tracking-tight">Taller y Producción</h1>
                    <p className="text-zinc-500 mt-2 text-sm">
                        Administra el flujo de trabajo de tus pedidos. Avanza las tarjetas conforme vayas terminando las joyas.
                    </p>
                </div>
            </header>

           
            <div className="flex-1 overflow-hidden">
                <KanbanBoard pedidosIniciales={mockPedidos} />
            </div>
        </div>
    )
}