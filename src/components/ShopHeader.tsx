import Link from 'next/link'
import UserProfile from './UserProfile';

async function getSession() {
    return {
        name: "Josesito",
        email: "josesito@hotmail.com"
    }
}



export default async function ShopHeader() {
    const sesion = await getSession();


    return (
        <header className="flex items-center justify-between border-b border-gray-800 bg-white text-black p-4 mb-6" style={{ fontFamily: 'Cinzel,serif' }}>

            <div className="flex-1 flex justify-start gap-4">

                <Link className="text-5xl font-bold p-5 transition-colors duration-300 hover:text-pink-200 cursor-pointer uppercase" href='/'>
                    kyanite
                </Link>
            </div>
            <div className="flex gap-8 shrink-0 ">
                <Link className="transition-colors duration-300 hover:text-pink-200 cursor-pointer" href='/categoria/todos'>Todos</Link>
                <Link className="transition-colors duration-300 hover:text-pink-200 cursor-pointer" href='/categoria/anillos'>Anillos</Link>
                <Link className="transition-colors duration-300 hover:text-pink-200 cursor-pointer" href='/categoria/aretes'>Aretes</Link>
                <Link className="transition-colors duration-300 hover:text-pink-200 cursor-pointer" href='/categoria/pulseras'>Pulseras</Link>
                <Link className="transition-colors duration-300 hover:text-pink-200 cursor-pointer" href='/categoria/chakras'>Chakras</Link>
            </div>
            <div className="flex-1 flex justify-end gap-8">
                <UserProfile user={sesion}/>
                <Link className='' href='/CarritoDeCompras'>🛒</Link>

            </div>

        </header>
    )
}