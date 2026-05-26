"use client";

import { useState } from "react";

interface FormProps {
    onClose: () => void;
    onSuccess: () => void;
    carrito: any[];
    total: number;
}

export default function DireccionForm({ onClose, onSuccess, carrito, total }: FormProps) {
    const [calle, setCalle] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [codigoPostal, setCodigoPostal] = useState("");
    const [referencia, setReferencia] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [mostrarModalExito, setMostrarModalExito] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg(null);

        const datosDireccion = {
            calle: calle,
            ciudad: ciudad,
            codigoPostal: codigoPostal,
            referencia: referencia
        };

        try {
            const response = await fetch("/api/mis-pedidos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    direccion: datosDireccion,
                    articulos: carrito,
                    total: total
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorMsg(data.error || "Ocurrió un problema al guardar tu pedido.");
            }
            else {
                setMostrarModalExito(true);
                onSuccess();
            }
        } catch (error) {
            console.log(error);
            setErrorMsg("Error de conexión con el servidor.");
        } finally {
            setIsLoading(false);
        }
    };

    function handleModalExito() {
        setMostrarModalExito(false);
        onSuccess();
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-zinc-900 mb-6 text-center">
                Dirección de Envío
            </h1>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">

                {errorMsg && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                        {errorMsg}
                    </div>
                )}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-zinc-700">Calle</label>
                    <input type="text" value={calle} onChange={(e) => setCalle(e.target.value)} placeholder="Ej. Lago Titikaka 123" className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900 transition-all bg-zinc-50/50" required />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-zinc-700">Ciudad</label>
                    <input type="text" value={ciudad} onChange={(e) => setCiudad(e.target.value)} placeholder="Ej. Ensenada" className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900 transition-all bg-zinc-50/50" required />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-zinc-700">Código Postal</label>
                    <input type="text" value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} placeholder="Ej. 22890" className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900 transition-all bg-zinc-50/50" required />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-zinc-700">Referencia</label>
                    <input type="text" value={referencia} onChange={(e) => setReferencia(e.target.value)} placeholder="Ej. Casa blanca con rejas negro" className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900 transition-all bg-zinc-50/50" />
                </div>

                <button type="submit" disabled={isLoading} className="w-full py-3 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:opacity-50 shadow-md mt-2" >
                    {isLoading ? "Guardando..." : "Guardar y Continuar"}
                </button>
            </form>

            {mostrarModalExito && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl flex flex-col items-center text-center transform scale-100 transition-all dynamic-island">
                        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 text-emerald-600 border border-emerald-100">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 mb-2">
                            Pedido Guardado
                        </h3>
                        <p className="text-sm text-zinc-500 mb-6">
                            Tu dirección y pedido se han registrado exitosamente en nuestro sistema.
                        </p>

                        <button onClick={handleModalExito} className="w-full py-3 bg-zinc-900 text-white rounded-xl font-semibold hover:bg-zinc-800 transition-all active:scale-[0.98] shadow-md">
                            Entendido
                        </button>
                    </div>
                </div>
            )};
        </div>
    );
}