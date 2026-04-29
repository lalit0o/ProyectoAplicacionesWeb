'use client'

import { useCartStore } from "@/store/useProductStore";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function CarritoUI() {
  
    const carrito = useCartStore((state) => state.carrito);
    const eliminarCarrito = useCartStore((state) => state.eliminarDelCarrito);

    const total = carrito.reduce((acumulador, articulo) => acumulador + articulo.precio, 0);

    if (carrito.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <h2 className="text-2xl font-serif text-zinc-900 mb-4">Tu carrito está vacío</h2>
                <p className="text-zinc-500 mb-8">Aún no has seleccionado ningún accesorio.</p>
                <Link href="/">
                    <Button className="bg-zinc-900 text-white hover:bg-zinc-800">
                        Volver al Catálogo
                    </Button>
                </Link>
            </div>
        );
    }

   
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-2 flex flex-col gap-6">
                <h2 className="text-2xl font-serif text-zinc-900 border-b pb-4">Revisar Carrito</h2>
                
                {carrito.map((art) => (
                    <div key={art.id} className="flex flex-row items-center gap-6 py-4 border-b border-zinc-100 group">
                        
                       
                        <div className="relative h-24 w-24 bg-zinc-50 rounded-md overflow-hidden flex-shrink-0">
                            <Image 
                        src={art.imagen || '/vestido.png'} 
                            fill 
                            sizes="96px"
                            alt={art.titulo} 
                            className="object-cover"
                        />
                        </div>

                      
                        <div className="flex-grow">
                            <h3 className="text-lg font-medium text-zinc-900">{art.titulo}</h3>
                            <p className="text-zinc-500 mt-1">${art.precio.toFixed(2)} MXN</p>
                        </div>

                       
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => eliminarCarrito(art.id)}
                            className="text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <Trash2 className="h-5 w-5" />
                        </Button>

                       
                    </div>
                ))}
            </div>

            
            <div className="lg:col-span-1">
                <Card className="sticky top-8 bg-zinc-40 border-transparent">
                    <CardHeader>
                        <CardTitle className="font-serif text-xl">Resumen del Pedido</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between text-zinc-600">
                            <span>Subtotal ({carrito.length} {carrito.length === 1 ? 'pieza' : 'piezas'})</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                       
                        <div className="border-t border-zinc-200 pt-4 flex justify-between items-center text-lg font-medium text-zinc-900">
                            <span>Total</span>
                            <span>${total.toFixed(2)} MXN</span>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full bg-zinc-900 text-white hover:bg-zinc-800 text-lg py-6">
                            Realizar pedido
                        </Button>
                    </CardFooter>
                    <CardFooter className="text-center text-sm text-zinc-500">
                        <p>Al hacer clic en "Realizar pedido", podrás tener el seguimiento del mismo en el apartado de "Mis pedidos".</p>
                    </CardFooter>
                </Card>
            </div>

        </div>
    );
}