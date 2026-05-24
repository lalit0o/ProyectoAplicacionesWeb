import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        if (!token) {
            return NextResponse.json({ error: "No has iniciado sesión" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretito') as { email: string };

        const usuario = await prisma.usuario.findUnique({
            where: { email: decoded.email }
        });

        if (!usuario) {
            return NextResponse.json({ error: "Usuario no válido" }, { status: 404 });
        }
        const body = await request.json();
        const { direccion, articulos, total } = body;
        const nuevoPedido = await prisma.pedido.create({
            data: {
                usuario: { connect: { id: usuario.id } },
                total: total,
                metodoEntrega: "PAQUETERIA",
                direccion: {
                    create: {
                        usuarioId: usuario.id,
                        calle: direccion.calle,
                        ciudad: direccion.ciudad,
                        codigoPostal: direccion.codigoPostal,
                        referencia: direccion.referencia
                    }
                },

                detalles: {
                    create: articulos.map((art: any) => ({
                        productoId: art.id,
                        cantidadComprada: art.cantidad,
                        precioUnitario: art.precio
                    }))
                }
            }
        });

        return NextResponse.json({ success: true, pedido: nuevoPedido }, { status: 201 });

    } catch (error) {
        console.error("Error al crear el pedido:", error);
        return NextResponse.json({ error: "Error interno al procesar tu orden" }, { status: 500 });
    }
}