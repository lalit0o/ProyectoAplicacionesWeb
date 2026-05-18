import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

type Payload = {
    name: string;
    email: string;
    rol: string;
}

export function middleware(request: NextRequest) {
    const token = request.cookies.get("accessToken")?.value;
    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith("/admin")) {
        return validarAdmin(token, request);
    }


    return NextResponse.next();


}

function validarAdmin(token: string | undefined, request: NextRequest) {
    if (!token) {
        return NextResponse.redirect(
            new URL("/login", request.url)

        );
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as Payload;

        if (payload.rol !== "ADMIN") {
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