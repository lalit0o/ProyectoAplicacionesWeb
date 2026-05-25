import { obtenerCategorias } from "@/lib/categoria";
import Link from "next/link";

export default async function ListaCategorias() {
    const categorias = await obtenerCategorias();

    return (
        <div className="flex gap-5">
            <Link href={"/categoria/todos"}>Todos</Link>
            {categorias.map((categoria) => (
                <Link
                    key={categoria.id}
                    href={`/categoria/${categoria.nombre}`}
                    className="capitalize">
                    {categoria.nombre}
                </Link>
            ))}
        </div>
    );
}