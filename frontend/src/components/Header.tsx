'use client'

import Link from 'next/link';
import { ShoppingBag, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/useProductStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import UserProfile from '@/components/UserProfile';

export default function Header() {

    const carrito = useCartStore((state) => state.carrito);

    return (
        <header className="flex flex-col md:flex-row items-center justify-between bg-white border-b border-zinc-100 py-4 px-6 md:px-8 mb-8 sticky top-0 z-50 gap-4 md:gap-0">

            <nav className="flex items-center gap-4 md:gap-6 order-2 md:order-1">
                <Link className="text-xs md:text-sm font-medium tracking-widest text-zinc-600 hover:text-zinc-900 transition-colors" href="/categoria/todos">
                    TIENDA
                </Link>
                <Link className="text-xs md:text-sm font-medium tracking-widest text-zinc-600 hover:text-zinc-900 transition-colors" href="/">
                    GALERÍA
                </Link>
                <Link className="text-xs md:text-sm font-medium tracking-widest text-zinc-600 hover:text-zinc-900 transition-colors" href="/">
                    CONTACTO
                </Link>
            </nav>

            <div className="flex justify-center order-1 md:order-2 md:absolute md:left-1/2 md:-translate-x-1/2">
                <Link className="text-3xl font-serif font-bold tracking-widest uppercase hover:opacity-80 transition-opacity text-zinc-900" href='/'>
                    Kyanite
                </Link>
            </div>

            <div className="flex justify-end items-center gap-2 absolute md:static top-4 right-4 order-3 md:order-3">
                <UserProfile />

                <Link href="/mis-pedidos" title="Mis Pedidos">
                    <Button variant="ghost" size="icon" className="text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded-full">
                        <ShoppingBag className="h-5 w-5" />
                    </Button>
                </Link>

                <Link href="/carrito-de-compras" title='Carrito'>
                    <Button variant="ghost" size="icon" className="relative text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded-full">
                        <ShoppingCart className="h-5 w-5" />

                        {carrito?.length > 0 && (
                            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-zinc-900 text-white text-[10px] rounded-full">
                                {carrito.length}
                            </Badge>
                        )}
                    </Button>
                </Link>
            </div>

        </header>
    );
}