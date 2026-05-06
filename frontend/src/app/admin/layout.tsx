"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Gem, 
  Settings, 
  LogOut,
  ChevronRight
} from "lucide-react"; // Usamos Lucide para iconos consistentes

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Definición de los links de navegación
  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Pedidos", href: "/admin/pedidos", icon: ShoppingBag },
    { name: "Materiales", href: "/admin/materiales", icon: Package },
    { name: "Productos", href: "/admin/productos", icon: Gem },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans text-zinc-900">
      
      {/* 1. SIDEBAR FIJA */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-zinc-200 flex flex-col shadow-sm">
        
        {/* Logo / Branding */}
        <div className="h-20 flex items-center px-8 border-b border-zinc-100">
          <Link href="/" className="group">
            <span className="font-serif text-2xl font-bold tracking-tighter text-zinc-950 group-hover:opacity-70 transition-opacity">
              KYANITE
            </span>
            <span className="block text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-medium">
              Admin Panel
            </span>
          </Link>
        </div>

        {/* Navegación Principal */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          <p className="px-4 text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-4">
            Gestión de Taller
          </p>
          
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive 
                    ? "bg-zinc-900 text-white shadow-md shadow-zinc-200" 
                    : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-900"} />
                  {item.name}
                </div>
                {isActive && <ChevronRight size={14} className="text-zinc-400" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer de la Sidebar (Perfil / Logout) */}
        <div className="p-4 border-t border-zinc-100">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-white text-xs font-bold">
              K
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold text-zinc-900 truncate">Admin Kyanite</p>
              <p className="text-[10px] text-zinc-500 truncate text-ellipsis">admin@kyanite.com</p>
            </div>
          </div>
          
          <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut size={16} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* 2. CONTENIDO PRINCIPAL (Con margen para no quedar debajo de la sidebar) */}
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        
        {/* Header Superior (Breadcrumbs o Búsqueda) */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-zinc-200 sticky top-0 z-40 flex items-center justify-between px-8">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <span>Admin</span>
            <ChevronRight size={12} />
            <span className="text-zinc-900 font-medium capitalize">
              {pathname.split("/").pop() || "Dashboard"}
            </span>
          </div>

          <div className="flex items-center gap-4">
             {/* Aquí podrías poner notificaciones o un buscador rápido */}
             <div className="px-3 py-1 bg-zinc-100 rounded-full text-[10px] font-bold text-zinc-500 uppercase">
               Taller Abierto
             </div>
          </div>
        </header>

        {/* Área de Visualización de Páginas */}
        <section className="flex-1 bg-zinc-50/50">
          {children}
        </section>

      </main>
    </div>
  );
}