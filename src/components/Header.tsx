export default function Header() {
    return (
        <header className="flex items-center justify-between bg-white text-black p-4 mb-6"style={{fontFamily: 'Cinzel,serif'}}>
            
            {/* 1. Lado Izquierdo: Contenedor de Links */}
            <div className="flex-1 flex justify-start gap-4">
                <a className=" text-lg font-semibold transition-colors duration-300 hover:text-blue-500 cursor-pointer" href="/">
                    TIENDA
                </a>
                <a className=" text-lg font-semibold transition-colors duration-300 hover:text-blue-500 cursor-pointer" href="/">
                    GALERÍA
                </a>
                <a className=" text-lg font-semibold transition-colors duration-300 hover:text-blue-500 cursor-pointer" href="/">
                    CONTACTO
                </a>
            </div>

            {/* 2. Centro: Título */}
            <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold uppercase"> kyanite</h1>
            </div>

            {/* 3. Lado Derecho: Espaciador invisible (para centrar el título) */}
            <div className="flex-1 flex justify-end">
                {/* Este div vacío "empuja" al título al centro exacto */}
            </div>

        </header>
    )
}