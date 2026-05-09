import MaterialSwitch from "./MaterialSwitch";
import { prisma } from "@/lib/prisma"; // Con el cambio ahora de full stack en next podemos importar prisma desde la vista.


export default async function MaterialesAdminPage() {
 
  const materiales = await prisma.material.findMany({orderBy: { nombre: "asc" }});

  return (
    <div className="p-8 space-y-6">
     

      <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
        
          <tbody className="divide-y divide-zinc-100">
            {materiales.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-zinc-500 italic">
                  No se encontraron materiales. 
                </td>
              </tr>
            ) : (
              materiales.map((m) => (
                <tr key={m.id} className="group hover:bg-zinc-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-zinc-900">{m.nombre}</td>
                  <td className="px-6 py-4 flex justify-center">
                   
                    <MaterialSwitch id={m.id} initialStock={m.enStock} />
                  </td>
                  <td className="px-6 py-4 text-right text-xs text-zinc-400 hover:text-zinc-900 cursor-pointer">
                    Editar
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}