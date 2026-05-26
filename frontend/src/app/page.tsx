import Link from "next/link";
import {MapPin, Mail } from "lucide-react"; 
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full">
      

        <section
          className="relative min-h-[calc(100vh-80px)] flex items-center bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/imagen1.webp')" }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <main className="relative z-10 container mx-auto px-8 md:px-20 text-white flex flex-col items-start">
            <h2 className="text-5xl md:text-7xl font-serif leading-tight drop-shadow-2xl">
              Magia universal <br />
              <span className="italic">en tu accesorio ideal.</span>
            </h2>

            <Link href="/categoria/todos">
              <button className="mt-10 px-12 py-4 bg-white hover:bg-zinc-100 text-black rounded-full transition-all duration-300 uppercase tracking-widest text-sm font-bold shadow-2xl">
                Explorar Colección
              </button>
            </Link>
            
          </main>
        </section>


  
      <section id="galeria" className="py-24 bg-zinc-50">
        <div className="container mx-auto px-8 md:px-20">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h3 className="text-sm font-bold tracking-widest text-zinc-400 uppercase">
                Nuestra Esencia
              </h3>
              <h2 className="text-4xl font-serif text-zinc-900 leading-snug">
                El poder de las piedras naturales, hecho a mano.
              </h2>
              <p className="text-zinc-600 leading-relaxed text-lg">
               ¿Quiénes somos? Kyanite es una marca de accesorios artesanales con cuarzos naturales, donde combinamos la magia y energía universal en tu accesorio especial.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[4/5] bg-zinc-200 rounded-2xl overflow-hidden relative">
                    <Image 
                        src="/anillos.jpg" 
                        alt="Kyanite" 
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500" 
                    />
                </div>
                 <div className="aspect-[4/5] bg-zinc-200 rounded-2xl overflow-hidden relative">
                    <Image 
                        src="/sol-amanecer.jpg" 
                        alt="Kyanite" 
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500" 
                    />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                 <div className="aspect-[4/5] bg-zinc-200 rounded-2xl overflow-hidden relative">
                    <Image 
                        src="/luna.jpg" 
                        alt="Kyanite" 
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500" 
                    />
                </div>
                <div className="aspect-[4/5] bg-zinc-200 rounded-2xl overflow-hidden relative">
                    <Image 
                        src="/collares.jpg" 
                        alt="Kyanite" 
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500" 
                    />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>



      <section id="contacto" className="py-24 bg-zinc-900 text-white">
        <div className="container mx-auto px-8 md:px-20 text-center max-w-3xl">
          <h2 className="text-4xl font-serif mb-8">Conecta con Kyanite</h2>
          <p className="text-zinc-400 mb-12 text-lg">
            ¿Buscas una pieza personalizada o tienes dudas sobre tu pedido? Escríbenos o visítanos en persona para armar tu accesorio a medida.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        
            <div className="flex flex-col items-center p-6 bg-zinc-800/50 rounded-2xl border border-zinc-700/50">
              
              <h4 className="font-bold mb-1">Instagram</h4>
              <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">@kyaniteens</a>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-zinc-800/50 rounded-2xl border border-zinc-700/50">
              <Mail className="h-8 w-8 mb-4 text-zinc-300" />
              <h4 className="font-bold mb-1">Correo</h4>
              <a href="mailto:hola@kyanite.com" className="text-sm text-zinc-400 hover:text-white transition-colors">kyaniteens@gmail.com</a>
            </div>

            <div className="flex flex-col items-center p-6 bg-zinc-800/50 rounded-2xl border border-zinc-700/50">
              <MapPin className="h-8 w-8 mb-4 text-zinc-300" />
              <h4 className="font-bold mb-1">Punto de Venta</h4>
              <p className="text-sm text-zinc-400 text-center"> Calle tercera.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}