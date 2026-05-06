
import { 
  DollarSign, 
  ShoppingBag, 
  Package, 
  TrendingUp, 
  AlertTriangle,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      
      {/* 1. CABECERA DE BIENVENIDA */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-zinc-900 tracking-tight">Panel de Control</h1>
          <p className="text-zinc-500 mt-1">Gestión integral de tu taller de joyería artesanal.</p>
        </div>
        <div className="flex gap-3">
          <Link 
            href="/" 
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-600 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-colors shadow-sm"
          >
            Ver tienda <ExternalLink size={14} />
          </Link>
        </div>
      </header>

      {/* 2. TARJETAS DE MÉTRICAS (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Ventas del Mes", value: "$12,450", trend: "+12%", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Pedidos Activos", value: "8", trend: "3 hoy", icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Materiales Críticos", value: "2", trend: "Revisar", icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Total Productos", value: "24", trend: "Kyanite", icon: Package, color: "text-purple-600", bg: "bg-purple-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className="text-[10px] font-bold text-zinc-400 bg-zinc-50 px-2 py-1 rounded-full uppercase">
                {stat.trend}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold text-zinc-900 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. SECCIÓN CENTRAL: GRÁFICO Y ACCIONES RÁPIDAS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Gráfico de Ventas (Ocupa 2/3) */}
        <div className="xl:col-span-2">
          {/* TODO: Aquí se conectará con los datos de NestJS */}
          {/* <MonthlySalesChart /> */}
        </div>

        {/* Widgets de Acceso Rápido */}
        <div className="space-y-6">
          <div className="bg-zinc-900 p-6 rounded-2xl text-white shadow-xl">
            <h3 className="font-serif text-lg mb-2">Estado del Taller</h3>
            <p className="text-zinc-400 text-sm mb-4">Tienes 3 pedidos en etapa de elaboración para hoy.</p>
            <Link 
              href="/admin/pedidos" 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:opacity-80 transition-opacity"
            >
              Ir al Kanban <TrendingUp size={14} />
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-serif text-lg text-zinc-900 mb-4">Notas Rápidas</h3>
            <textarea 
              className="w-full h-32 p-3 text-sm bg-zinc-50 border-none rounded-xl focus:ring-1 focus:ring-zinc-900 resize-none text-zinc-600"
              placeholder="Recordatorio: Comprar amatista redonda de 8mm..."
            />
          </div>
        </div>
      </div>

  
      <div className="w-full">
        {/* TODO: Aquí se conectará con el endpoint de Pedidos Recientes */}
        {/* <RecentOrders /> */}
      </div>
      
    </div>
  );
}