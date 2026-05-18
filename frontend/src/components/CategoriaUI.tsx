import Articulo from "@/components/Articulo";
import ListaCategorias from "./ui/Categorias";

type ArticuloType = {
    id: number;
    titulo: string;
    categoria: string;
    precio: number;
    imagen: string;
    descripcion?: string;
    esNuevo?: boolean;
}

type Props = {
    articulos: ArticuloType[];
    tituloCategoria?: string;
}

export default function CategoriaUI({ articulos, tituloCategoria = "Nuestra Colección" }: Props) {


    return (

        <main className="container mx-auto px-4 py-12 md:py-16">


            <div className="flex flex-col items-center text-center mb-16">
                <h1 className="text-4xl font-serif text-zinc-900 mb-6 capitalize">
                    {tituloCategoria}
                </h1>
                <ListaCategorias/>

                <div className="h-px w-24 bg-zinc-200" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                {articulos.map((item) => (
                    <Articulo key={item.id} articulo={item} />
                ))}
            </div>

        </main>
    );
}