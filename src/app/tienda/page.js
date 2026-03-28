import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Articulo from "@/components/Articulo";



export default function Tienda() {

    const articulos = [{id:1,titulo:"Mierda seca", precio:30, imagen:'imagen2.webp'}]
    return (<div className="min-h-screen">
        <Header />
            {articulos.map((item)=>(
                <Articulo key={item.id} articulo={item}/>
            ))}


        <Footer />

        
    </div>)

}