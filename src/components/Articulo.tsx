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
            <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className='text-black text-center p-4'>
                    <h1 className="text-2xl">{articulo.titulo}</h1>
                </div>
                <div className='aspect-[3/4] relative'>
                    <Image src='/vestido.png'
                        fill
                        alt='Picture of the author' />

                </div>
                <div className='p-4'>
                    <p className="text-black text-center">${articulo.precio}</p>
                </div>


            </div>
        </Link>)

}