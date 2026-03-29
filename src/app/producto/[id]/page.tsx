type params = {
    id:number
}

type props = {
    params:params
}

export default async function Producto({params}:props) {
    const {id} = await params;
    return (
    <div className="text-black">
        <h1>Hola, estas viendo el producto con id : {id}</h1>
    </div>)
}