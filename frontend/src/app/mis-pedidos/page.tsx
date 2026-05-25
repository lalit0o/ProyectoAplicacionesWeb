import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Package, Truck, CheckCircle2, Clock } from "lucide-react";

const getEstadoUI = (estado: string) => {
    switch (estado) {
        case "PENDIENTE":
        case "ACEPTADO":
            return { color: "bg-amber-100 text-amber-700", icon: Clock };
        case "ELABORANDO":
            return { color: "bg-blue-100 text-blue-700", icon: Package };
        case "ENVIADO":
            return { color: "bg-purple-100 text-purple-700", icon: Truck };
        case "ENTREGADO":
            return { color: "bg-green-100 text-green-700", icon: CheckCircle2 };
        default:
            return { color: "bg-zinc-100 text-zinc-700", icon: Package };
    }
};

export default async function MisPedidosPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
        redirect("/login");
    }

    let email = "";
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretito') as { email: string };
        email = decoded.email;
    } catch (error) {
        redirect("/login");
    }

    const pedidos = await prisma.pedido.findMany({
        where: { usuario: { email } },
        orderBy: { fechaCreacion: "desc" },
        include: {
            detalles: {
                include: {
                    producto: true 
                }
            }
        }
    });

    return (
        <div className="max-w-5xl mx-auto p-8 min-h-screen">
            <h1 className="text-3xl font-serif text-zinc-900 mb-2">Mis Pedidos</h1>
            <p className="text-zinc-500 mb-8">Revisa el historial y estado de tus compras.</p>

            {pedidos.length === 0 ? (
                <div className="text-center py-20 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <Package className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
                    <h2 className="text-xl font-serif text-zinc-900 mb-2">Aún no tienes pedidos</h2>
                    <p className="text-zinc-500">Cuando realices una compra, aparecerá aquí.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    {pedidos.map((pedido) => {
                        const EstadoIcon = getEstadoUI(pedido.estadoPedido).icon;

                        return (
                            <Card key={pedido.id} className="overflow-hidden border-zinc-200 hover:shadow-md transition-shadow">
                                <CardHeader className="bg-zinc-50/50 border-b border-zinc-100 pb-4">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <CardTitle className="text-lg font-serif text-zinc-900">
                                                Pedido #{pedido.id}
                                            </CardTitle>
                                            <p className="text-sm text-zinc-500 mt-1">
                                                {new Date(pedido.fechaCreacion).toLocaleDateString("es-MX", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </p>
                                        </div>
                                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${getEstadoUI(pedido.estadoPedido).color}`}>
                                            <EstadoIcon className="w-4 h-4" />
                                            {pedido.estadoPedido}
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="pt-6">
                                    <div className="flex flex-col gap-4">
                                        {pedido.detalles.map((detalle) => (
                                            <div key={detalle.id} className="flex items-center gap-4">
                                                <div className="h-16 w-16 bg-zinc-100 rounded-xl flex items-center justify-center flex-shrink-0 border border-zinc-200">
                                                    <Package className="w-6 h-6 text-zinc-400" />
                                                </div>
                                                
                                                <div className="flex-grow">
                                                    <h3 className="font-medium text-zinc-900">{detalle.producto.titulo}</h3>
                                                    <p className="text-sm text-zinc-500">Cantidad: {detalle.cantidadComprada}</p>
                                                </div>
                                                <div className="font-medium text-zinc-900">
                                                    ${detalle.precioUnitario.toFixed(2)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>

                                <CardFooter className="bg-zinc-50 border-t border-zinc-100 flex justify-between items-center py-4">
                                    <span className="text-zinc-600 font-medium">Total Pagado</span>
                                    <span className="text-xl font-bold text-zinc-900">
                                        ${pedido.total.toFixed(2)} MXN
                                    </span>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}