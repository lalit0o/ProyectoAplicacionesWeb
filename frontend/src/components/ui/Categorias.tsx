import { obtenerCategorias } from "@/lib/categoria";
import Link from "next/link";

type Props = {
    categoriaActiva: string;
}

export default async function ListaCategorias({ categoriaActiva }: Props) {
    const categorias = await obtenerCategorias();

    return (
        <div className="flex gap-5">
            <Link 
                href={"/categoria/todos"}
                className={`${categoriaActiva === "todos" ? "font-semibold text-zinc-700" : "text-zinc-500"} hover:text-zinc-700 transition-colors`}
            >
                Todos
            </Link>
            
            {categorias.map((categoria) => (
                <Link
                    key={categoria.id}
                    href={`/categoria/${categoria.nombre}`}
                    className={`capitalize hover:text-zinc-700 transition-colors ${categoriaActiva === categoria.nombre ? "font-semibold text-zinc-700" : "text-zinc-500"}`}
                >
                    {categoria.nombre}
                </Link>
            ))}
        </div>
    );
}