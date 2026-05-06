import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Package, Users, Settings } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 flex font-sans">
      
      {/* BARRA LATERAL (SIDEBAR) */}
      <aside className="w-64 bg-white border-r border-zinc-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-zinc-200">
          <span className="font-serif text-xl font-bold uppercase tracking-widest text-zinc-900">
            Kyanite Admin
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 rounded-lg transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/admin/pedidos" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 rounded-lg transition-colors">
            <ShoppingBag className="w-5 h-5" />
            <span className="font-medium">Pedidos</span>
          </Link>
          <Link href="/admin/materiales" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 rounded-lg transition-colors">
            <Package className="w-5 h-5" />
            <span className="font-medium">Materiales</span>
          </Link>
          <Link href="/admin/clientes" className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 rounded-lg transition-colors">
            <Users className="w-5 h-5" />
            <span className="font-medium">Clientes</span>
          </Link>
        </nav>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 overflow-y-auto">
        {/* Aquí se renderizarán las subpáginas del admin */}
        {children}
      </main>
      
    </div>
  );
}