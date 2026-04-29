import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


type ArticuloType = {
    id: number;
    titulo: string;
    precio: number;
    imagen: string;
    descripcion?: string;
    esNuevo?: boolean;
}

type Props = {
    articulo: ArticuloType
}

export default function Articulo({ articulo }: Props) {
    return (
        <Card className="group overflow-hidden transition-all hover:shadow-lg border-zinc-100">

            <Link href={`/producto/${articulo.id}`}>

                <div className="relative aspect-square bg-zinc-50 overflow-hidden">

                    {articulo.esNuevo && (
                        <Badge className="absolute top-3 left-3 z-10 bg-zinc-900 text-white hover:bg-zinc-800">
                            Nuevo
                        </Badge>
                    )}


                    <Image
                        src={articulo.imagen || '/vestido.png'}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                        alt={`Fotografía de ${articulo.titulo}`}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
            </Link>


            <CardContent className="p-4 text-center">
                <Link href={`/producto/${articulo.id}`}>
                    <h2 className="font-serif text-lg text-zinc-900 truncate hover:text-zinc-600 transition-colors">
                        {articulo.titulo}
                    </h2>
                </Link>

                <p className="text-zinc-500 mt-1 font-medium">
                    ${articulo.precio.toFixed(2)} MXN
                </p>
            </CardContent>


            <CardFooter className="px-4 pb-4 pt-0">
                <Link href={`/producto/${articulo.id}`} className="w-full">
                    <Button className="w-full bg-zinc-900 text-white hover:bg-zinc-800 transition-colors">
                        Ver Detalles
                    </Button>
                </Link>
            </CardFooter>

        </Card>
    );
}