import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// registro
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {email, password } = body;

        if(!email || !password){

        }

        const usuario = await prisma.usuario.findUnique({
            where: { email }
        });

        if(!usuario) {
            return NextResponse.json({ message: "No hay un usuario con ese email"}, { status: 400});
        }
        if(usuario.password !== password)
        {
            return NextResponse.json({message:"La contraseña no coincide"},{status:400});
        }

        const token = jwt.sign(
            {sub: usuario.nombre, email: usuario.email, rol: usuario.rol },
            process.env.JWT_SECRET || 'secretito',
            {expiresIn: '1h'}
        );

        return NextResponse.json({ message: "Inicio se sesión exitoso", token }, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error interno del servidor"}, {status: 500});
    }
}