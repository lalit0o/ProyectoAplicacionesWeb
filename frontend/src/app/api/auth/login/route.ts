import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
<<<<<<< HEAD
import { cookies } from 'next/headers'
=======
>>>>>>> 77fe75b4f016eb3d1bb80dc47651fb68012df41b

// login
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

<<<<<<< HEAD
        const passwordValida = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!passwordValida) {
            return NextResponse.json({ message: "credencial invalida" }, { status: 400 });
=======
        const coincide = await bcrypt.compare(password,usuario.password)
        if(!coincide){
            return NextResponse.json({message:"Las contraseñas no coinciden"},{status:400});
>>>>>>> 77fe75b4f016eb3d1bb80dc47651fb68012df41b
        }
        

        const token = jwt.sign(
            { sub: usuario.nombre, email: usuario.email, rol: usuario.rol },
            process.env.JWT_SECRET || 'secretito',
<<<<<<< HEAD
            { expiresIn: '1h' }
=======
            {expiresIn: '5h'}
>>>>>>> 77fe75b4f016eb3d1bb80dc47651fb68012df41b
        );

        const cookieStore = await cookies();
        cookieStore.set("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/"


        })

<<<<<<< HEAD
        return NextResponse.json({ message: "Inicio de sesión exitoso" }, { status: 200 })
=======
        return NextResponse.json({message:"Inicio de sesión exitoso",rol:usuario.rol},{status:200})
>>>>>>> 77fe75b4f016eb3d1bb80dc47651fb68012df41b
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}