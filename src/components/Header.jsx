import Link from 'next/link'

export default function Header() {
    return (
        <header className="flex items-center justify-between bg-white text-black p-4 mb-6"style={{fontFamily: 'Cinzel,serif'}}>
            
            <div className="flex-1 flex justify-start gap-4">
                <Link className=" text-lg font-semibold transition-colors duration-300 hover:text-pink-200 cursor-pointer" href="/categoria/todos">
                    TIENDA
                </Link>
                <Link className=" text-lg font-semibold transition-colors duration-300 hover:text-pink-200 cursor-pointer" href="/">
                    GALERÍA
                </Link>
                <Link className=" text-lg font-semibold transition-colors duration-300 hover:text-pink-200 cursor-pointer" href="/">
                    CONTACTO
                </Link>
            </div>

            <div className="flex-shrink-0">
                <Link className="text-2xl font-bold transition-colors duration-300 hover:text-pink-200 cursor-pointer uppercase" href='/'>
                    kyanite
                </Link>
            </div>

            <div className="flex-1 flex justify-end">
            </div>

        </header>
    )
}