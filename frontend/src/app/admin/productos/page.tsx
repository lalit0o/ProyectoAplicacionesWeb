import { prisma } from "@/lib/prisma";
import ProductoAgregar from "./ProductoAgregar";
import {DataTable } from "@/components/DataTable"; // Ajusta tu ruta si es diferente
import { columns } from "@/app/admin/productos/columns";

export default async function ProductosAdminPage() {
  
  const materialesDB = await prisma.material.findMany({
      orderBy: { nombre: "asc" }
  });

  const productosDB = await prisma.producto.findMany({
    orderBy: { titulo: "asc" },
    include: {
      recetas: {
        include: {
          material: true 
        }
      }
    }
  });


  const productosMapeados = productosDB.map((producto) => {

    const leFaltanMateriales = producto.recetas.some(
      (item) => item.material.enStock === false
    );

    return {
      id: producto.id,
      titulo: producto.titulo,
      precio: Number(producto.precio), 
      imagenUrl: producto.imagenUrl,
      enStock: producto.enStock,
      stockReal: producto.enStock && !leFaltanMateriales,
      materialesIds: producto.recetas.map((item) => item.material.id),
    };
  });

  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-100 pb-6">
        <div className="space-y-1">
        
          <h1 className="text-3xl font-serif text-zinc-900 tracking-tight">
            Panel de productos
          </h1>
          <p className="text-zinc-500 text-sm">
            Gestiona el inventario de collares y anillos de <span className="italic font-medium">Kyanite Artesanal</span>.
          </p>
        </div>
        
      
        <ProductoAgregar materiales={materialesDB} />
      </section>

      <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
       
        <DataTable 
            columns={columns} 
            data={productosMapeados} 
            meta={{ materiales: materialesDB }} 
            searchKey="titulo" 
        />
      </div>
      
    </div>
  );
}