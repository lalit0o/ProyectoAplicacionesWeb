import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    try {

        const body = await request.json();

        const direccion = await prisma.direccion.create({
            data: {
                calle: body.calle,
                ciudad: body.ciudad,
                codigoPostal: body.codigoPostal,
                referencia: body.referencia,
                usuarioId: body.usuarioId,
            },
        });

        return NextResponse.json(direccion);

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            { error: "Error al guardar direccion" },
            { status: 500 }
        );
    }
}