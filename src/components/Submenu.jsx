import Link from "next/link";

export default function Submenu(){

    return (
    <div className="flex items-center justify-center gap-6 bg-white text-black p-4 mb-6 font-semibold "style={{fontFamily: 'Cinzel,serif'}}>
    <Link className="transition-colors duration-300 hover:text-pink-200 cursor-pointer" href='/categoria/todos'>Todos</Link>
    <Link className="transition-colors duration-300 hover:text-pink-200 cursor-pointer" href='/categoria/anillos'>Anillos</Link>
    <Link className="transition-colors duration-300 hover:text-pink-200 cursor-pointer" href='/categoria/aretes'>Aretes</Link>
    <Link className="transition-colors duration-300 hover:text-pink-200 cursor-pointer" href='/categoria/pulseras'>Pulseras</Link>
    <Link className="transition-colors duration-300 hover:text-pink-200 cursor-pointer" href='/categoria/chakras'>Chakras</Link>    
    
    </div>)
}