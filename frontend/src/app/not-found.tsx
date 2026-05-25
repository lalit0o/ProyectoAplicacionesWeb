import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white px-6 text-center">
            
            <div className="relative z-10 flex flex-col items-center">
                <h2 className="font-serif text-3xl md:text-4xl text-zinc-900 mb-4 tracking-tight italic">
                    Parece que te perdiste...
                </h2>
                
                <p className="font-sans text-zinc-500 max-w-md mb-10 text-lg font-light">
                    La página que buscas no existe, fue movida o actualmente no está disponible en nuestra colección.
                </p>

                <Link
                    href="/"
                    className="px-8 py-4 bg-zinc-900 text-white font-medium rounded-full hover:bg-zinc-700 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl active:scale-95"
                >
                    Volver a la colección
                </Link>
            </div>
        </div>
    );
}