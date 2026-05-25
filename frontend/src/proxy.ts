import { NextRequest, NextResponse } from "next/server";
import {jwtVerify} from 'jose';

type Payload = {
    name: string;
    email: string;
    rol: string;
}

export function proxy(request: NextRequest) {
    const token = request.cookies.get("accessToken")?.value;
    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith("/admin")) {
        return validarAdmin(token, request);
    }


    return NextResponse.next();


}

async function validarAdmin(token: string | undefined, request: NextRequest) {
    if (!token) {
        return NextResponse.redirect(
            new URL("/login", request.url)

        );
    }

    try {
        const llave = new TextEncoder().encode(process.env.JWT_SECRET!);
        const {payload} = await jwtVerify(token, llave);
        const usuario = payload as Payload;

        if (usuario.rol !== "ADMIN") {
            return NextResponse.redirect(
                new URL("/login", request.url)
            );
        }

        return NextResponse.next();

    } catch (error) {
        console.log(error);
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }

}