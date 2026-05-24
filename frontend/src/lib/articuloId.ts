import { prisma } from "@/lib/prisma";


export async function obtenerId(nombre:string)
{
    const id=parseInt(nombre,10);
    const articulo = await prisma.producto.findFirst({where:{id}})
    return articulo;

}