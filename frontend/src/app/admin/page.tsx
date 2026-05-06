import MonthlySalesChart from "@/components/ecommerce/MonthlySales";
import RecentOrders from "@/components/ecommerce/RecentOrders";

export default function AdminDashboardPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-serif text-zinc-900">Resumen del Taller</h1>
        <p className="text-zinc-500 mt-2">Revisa tus métricas de ventas y últimos pedidos.</p>
      </header>

      {/* Grid para acomodar los componentes */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* El gráfico toma 2/3 del espacio en pantallas grandes */}
        <div className="xl:col-span-2">
          <MonthlySalesChart />
        </div>

        {/* Aquí podrías poner otro componente en el futuro (ej. Resumen de Materiales Agotados) */}
        <div className="xl:col-span-1 bg-zinc-50 rounded-2xl border border-zinc-200 p-6 flex items-center justify-center text-zinc-400 text-sm">
          Espacio para otro widget...
        </div>

      </div>

      {/* La tabla toma todo el ancho abajo */}
      <div className="w-full">
        <RecentOrders />
      </div>
    </div>
  );
}