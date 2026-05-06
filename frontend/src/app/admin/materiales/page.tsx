import MaterialSwitch from "./MaterialSwitch";


const mockMateriales = [
    { id: 1, nombre: "Amatista 8mm redonda", enStock: true },
    { id: 2, nombre: "Alambre Dorado Calibre 22", enStock: true },
    { id: 3, nombre: "Cadena Fina Dorada", enStock: false },
    { id: 4, nombre: "Cuarzo Rosa facetado", enStock: true },
    { id: 5, nombre: "Broches tipo Langosta (Plata)", enStock: false },
];

export default function MaterialesPage() {
    return (
        <div className="p-8 max-w-5xl mx-auto">
           
            <header className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-zinc-900 tracking-tight">Insumos y Materiales</h1>
                    <p className="text-zinc-500 mt-2 text-sm">
                        Apaga los materiales agotados. Los productos de la tienda que dependan de ellos se marcarán como "Agotados" automáticamente.
                    </p>
                </div>
                <button className="bg-zinc-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors shadow-sm whitespace-nowrap">
                    + Añadir Material
                </button>
            </header>

            {/* Tabla Principal */}
            <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-zinc-50/80 border-b border-zinc-200 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                            <th className="px-6 py-4 w-20">ID</th>
                            <th className="px-6 py-4">Nombre del Insumo</th>
                            <th className="px-6 py-4 w-32 text-center">Disponible</th>
                            <th className="px-6 py-4 w-24 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                        {mockMateriales.map((mat) => (
                            <tr key={mat.id} className="hover:bg-zinc-50/50 transition-colors group">
                                <td className="px-6 py-4 text-zinc-400 font-mono text-sm">
                                    #{mat.id.toString().padStart(3, '0')}
                                </td>
                                <td className="px-6 py-4 text-zinc-800 font-medium text-sm">
                                    {mat.nombre}
                                    {/* Etiqueta visual si está agotado */}
                                    {!mat.enStock && (
                                        <span className="ml-3 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                            Agotado
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 flex justify-center items-center h-full pt-4">
                                    <MaterialSwitch id={mat.id} initialStock={mat.enStock} />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-zinc-400 hover:text-zinc-900 text-sm transition-colors opacity-0 group-hover:opacity-100">
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}