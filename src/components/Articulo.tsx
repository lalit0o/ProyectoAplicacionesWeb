import Link from 'next/link';

type articulo = {
    id: number,
    titulo: string,
    precio: number,
    imagen: string
    descripcion?: string
}


type props = {
    articulo: articulo
}

export default function Articulo({ articulo }: props) {
    return (
        <Link href={`/producto/${articulo.id}`}>
            <div className="text-center bg-gray-900 py-5 px-5 rounded-3xl">
            <h1 className="text-blue">{articulo.titulo}</h1>
            <p className="text-purple-900">{articulo.precio}</p>
            <p>{articulo.imagen}</p>


            </div>
        </Link>)

}