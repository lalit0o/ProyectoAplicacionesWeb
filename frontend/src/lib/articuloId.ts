import { prisma } from "@/lib/prisma";


export async function obtenerId(idString:string)
{
    const id=parseInt(idString,10);
    const articulo = await prisma.producto.findUnique({where:{id}})
    return articulo;
}