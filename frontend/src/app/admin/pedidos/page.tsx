import KanbanBoard from "./KanbanBoard";

const mockPedidos: any[] = [
    { id: 101, cliente: "Ana Martínez", total: 1250, metodoEntrega: "PAQUETERIA", estado: "PENDIENTE", productos: ["Collar Amatista", "Aretes Gota"] },
    { id: 102, cliente: "Carlos Ruiz", total: 450, metodoEntrega: "RECOLECCION", estado: "PENDIENTE", productos: ["Pulsera Cuarzo"] },
    { id: 103, cliente: "Sofia Castro", total: 890, metodoEntrega: "PAQUETERIA", estado: "ACEPTADO", productos: ["Anillo Luna"] },
    { id: 104, cliente: "Laura Gómez", total: 2100, metodoEntrega: "RECOLECCION", estado: "ELABORANDO", productos: ["Set Especial Kyanite"] },
];

export default function PedidosPage() {
    return (
        <div className="p-8 h-[calc(100vh-80px)] flex flex-col space-y-6">
            <header>
                <h1 className="text-3xl font-serif text-zinc-900 tracking-tight">Flujo de Producción</h1>
                <p className="text-zinc-500 text-sm mt-1">Gestiona el taller moviendo las tarjetas conforme trabajas.</p>
            </header>

            <div className="flex-1 overflow-hidden">
                <KanbanBoard pedidosIniciales={mockPedidos} />
            </div>
        </div>
    );
}