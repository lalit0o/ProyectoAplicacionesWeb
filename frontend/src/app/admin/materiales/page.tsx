import { prisma } from "@/lib/prisma";
import MaterialAgregar from "./MaterialAgregar";
import { MaterialesDataTable } from "@/components/DataTable";
import { columns } from "./columns"; // Donde definimos las celdas y el switch

export default async function MaterialesAdminPage() {

  const materiales = await prisma.material.findMany({
    orderBy: { nombre: "asc" }
  });

  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      
      
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-100 pb-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-serif text-zinc-900 tracking-tigh">
            Panel de materiales
          </h1>
          <p className="text-zinc-500 text-sm">
            Gestiona el inventario de piedras, hilos y metales de <span className="italic font-medium">Kyanite Jewelry</span>.
          </p>
        </div>
        
      
        <MaterialAgregar />
      </section>

     
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        <MaterialesDataTable columns={columns} data={materiales} />
      </div>
      
    </div>
  );
}