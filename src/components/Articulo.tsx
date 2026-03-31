import Link from 'next/link';
import Image from 'next/image'

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
            <div className="flex flex-col text-center bg-pink-100 py-5 px-5 rounded-2xl text-black hover:bg-pink-200 transition-colors duration-300">
                <Image src='/imagen2.webp'
                    width={500}
                    height={200}
                    alt='Picture of the author' />
                <h1 className="">{articulo.titulo}</h1>
                <p className="">{articulo.precio}</p>


            </div>
        </Link>)

}