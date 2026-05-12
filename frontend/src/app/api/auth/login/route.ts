import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { cookies } from 'next/headers'

// registro
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ message: "Faltan credenciales" }, { status: 400 });
        }

        const usuario = await prisma.usuario.findUnique({
            where: { email }
        });

        if (!usuario) {
            return NextResponse.json({ message: "No hay un usuario con ese email" }, { status: 400 });
        }

        const passwordValida = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!passwordValida) {
            return NextResponse.json({ message: "credencial invalida" }, { status: 400 });
        }

        const token = jwt.sign(
            { sub: usuario.nombre, email: usuario.email, rol: usuario.rol },
            process.env.JWT_SECRET || 'secretito',
            { expiresIn: '1h' }
        );

        const cookieStore = await cookies();
        cookieStore.set("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/"


        })

        return NextResponse.json({ message: "Inicio de sesión exitoso" }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}