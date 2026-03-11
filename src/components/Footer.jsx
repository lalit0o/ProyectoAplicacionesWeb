export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-white py-8 border-t border-slate-700">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-slate-400">
          © 2026 <span className="font-bold text-white">Mi Proyecto Web</span>
        </p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="#" className="hover:text-blue-400 transition-colors">Inicio</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Proyectos</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Contacto</a>
        </div>
      </div>
    </footer>
  );
}