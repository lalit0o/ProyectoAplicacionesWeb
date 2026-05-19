import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";


type Usuario ={
    nombre: string,
    email:string,
    password:string,
    telefono?:string
}

// registro
export async function POST(request: Request) {
    try {
        
        const { nombre, email, password,telefono }:Usuario = await request.json();

        if(!nombre || !email || !password){
            return NextResponse.json({message: "Faltan credenciales"},{status:401});
        }

        const existeUsuario = await prisma.usuario.findUnique({
            where: { email }

        });
        console.log(existeUsuario);

        if(existeUsuario) {
            return NextResponse.json({ message: "El correo ya esta en uso"}, { status: 400});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.usuario.create({
            data: {
                nombre,
                email,
                password: hashedPassword,
                telefono:telefono || null
            },
        });


        return NextResponse.json({ message: "Usuario registrado exitosamente"}, {status: 201});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error interno del servidor"}, {status: 500});
    }
}