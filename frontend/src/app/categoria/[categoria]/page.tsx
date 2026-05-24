import CategoriaUI from "@/components/CategoriaUI";
import { obtenerArticulos } from "@/lib/articulos";


interface ArticuloType {
    id: number;
    titulo: string;
    precio: number;
    imagenUrl?: string;
    enStock: boolean;
    categoria?: string;
    categoriaId?: number;
}

type Props = {
    params: Promise<{ categoria :{categoria:string}}>;
};







export default async function CategoriaPage({ params }: Props) {

    const { categoria }:typeof categoria = await params;



    const articulos= await obtenerArticulos(categoria);


    return (
        <CategoriaUI
            articulos={articulos}
            tituloCategoria={categoria === "todos" ? "Colección Completa" : categoria}
        />
    );
}