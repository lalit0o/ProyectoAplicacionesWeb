import Link from "next/link";


export default function LandingPage() {
  return (
 
    <div 
      className="min-h-[calc(100vh-80px)] flex items-center bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: "url('/imagen1.webp')" }}
    >      
      
  

      <main className="container mx-auto px-8 md:px-20 text-white flex flex-col items-start">
        
        <h2 className="text-5xl md:text-7xl font-serif leading-tight">
          Magia universal <br/>
          <span className="italic">en tu accesorio ideal.</span>
        </h2>
        
    
        <Link href="/categoria/todos">
            <button className="mt-10 px-12 py-4 bg-white hover:bg-zinc-100 text-black rounded-full transition-all duration-300 uppercase tracking-widest text-sm font-bold shadow-xl">
                Explorar Colección
            </button>
        </Link>

      </main>

      
    </div>
  )
} 