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

function validarAdmin(
    token: string | undefined,
    request: NextRequest
) {

    console.log("ENTRO VALIDAR");
    console.log(token);

    return NextResponse.next();
}