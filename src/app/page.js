import Footer from "../components/Footer";
import Header from "../components/Header";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('imagen1.webp')"}}>      
      <Header />

      <main className="flex-1 flex-col justify-center text-white  px-4 ml-20 items-start" style={{fontFamily: "var(--font-geist-sans)"}}>
        <div className="flex-1 mb-20"></div>
        <h2 className="text-6xl text-left">Magia universal <br/>en tu accesorio ideal.</h2>
        
        <button className="mt-8 px-20 py-4 bg-white hover:bg-blue-700 text-black rounded-3xl transition-colors uppercase">comprar</button>
      </main>

      <Footer />
      
    </div>


  )
}