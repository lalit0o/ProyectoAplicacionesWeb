export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <h1 className="text-7xl font-bold text-black">404</h1>
            <p className="text-2xl mt-4 text-black">La página que buscas no está disponible</p>

            <a
                href="/"
                className="mt-6 px-6 py-3 bg-pink-500 rounded-xl hover:bg-pink-600 transition text-white"
            >
                Volver al inicio
            </a>
        </div>
    );
}