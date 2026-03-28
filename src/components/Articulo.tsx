type articulo = {
    titulo: string,
    precio: number,
    imagen: string
}


type props = {
    articulo: articulo
}

export default function Articulo({ articulo }: props) {
    return (<div className="flex justify-center bg-blue-900 rounded-3xl">
        <h1 className="text-blue">{articulo.titulo}</h1>
        <p className="text-purple-900">{articulo.precio}</p>
        <p>{articulo.imagen}</p>


    </div>)

}