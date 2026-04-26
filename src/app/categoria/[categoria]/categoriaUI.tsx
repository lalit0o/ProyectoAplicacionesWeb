import ShopHeader from "../../../components/ShopHeader";
import Footer from "../../../components/Footer";
import Articulo from "../../../components/Articulo";


type Articulo = {
    id: number,
    titulo: string,
    categoria: string,
    precio: number,
    imagen: string,
    descripcion?: string,

}
type props = {
    articulos:Articulo[]
}

export default function CategoriaUI({ articulos }:props) {




    return (<>
        <ShopHeader />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 ml-5 mr-5">
            {articulos.map((item) => (
                <Articulo key={item.id} articulo={item} />
            ))}
        </div>



        <Footer />
    </>
    );
}