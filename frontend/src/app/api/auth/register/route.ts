import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// registro
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { nombre, email, password } = body;

        const existeUsuario = await prisma.usuario.findUnique({
            where: { email }
        });

        if(existeUsuario) {
            return NextResponse.json({ message: "El correo ya esta en uso"}, { status: 400});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const nuevoUsuario = await prisma.usuario.create({
            data: {
                nombre,
                email,
                password: hashedPassword,
            },
        });

        const token = jwt.sign(
            {sub: nuevoUsuario.id, email: nuevoUsuario.email, rol: nuevoUsuario.rol },
            process.env.JWT_SECRET || 'secretito',
            {expiresIn: '1h'}
        );

        return NextResponse.json({ message: "Usuario registrado exitosamente", token }, {status: 201});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error interno del servidor"}, {status: 500});
    }
}