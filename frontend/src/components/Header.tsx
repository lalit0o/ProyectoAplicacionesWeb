'use client'

import Link from 'next/link';
import { ShoppingBag} from 'lucide-react';
import { useCartStore } from '@/store/useProductStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import UserProfile from '@/components/UserProfile'

export default function Header() {

    const carrito = useCartStore((state) => state.carrito);

    return (

        <header className="grid grid-cols-3 items-center bg-white border-b border-zinc-100 py-4 px-8 mb-8 sticky top-0 z-50">


            <nav className="flex items-center gap-6">
                <Link className="text-sm font-medium tracking-widest text-zinc-600 hover:text-zinc-900 transition-colors" href="/categoria/todos">
                    TIENDA
                </Link>
                <Link className="text-sm font-medium tracking-widest text-zinc-600 hover:text-zinc-900 transition-colors" href="/">
                    GALERÍA
                </Link>
                <Link className="text-sm font-medium tracking-widest text-zinc-600 hover:text-zinc-900 transition-colors" href="/">
                    CONTACTO
                </Link>
            </nav>


            <div className="flex justify-center">

                <Link className="text-3xl font-serif font-bold tracking-widest uppercase hover:opacity-80 transition-opacity" href='/'>
                    Kyanite
                </Link>
            </div>

            <div className="flex justify-end items-center gap-2">


                <UserProfile/>


                <Link href="/carrito-de-compras">
                    <Button variant="ghost" size="icon" className="relative text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50">
                        <ShoppingBag className="h-5 w-5" />


                        {carrito.length > 0 && (
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