
import {cookies} from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from "jsonwebtoken";

type Payload =
{
    sub:string;
    email:string;
    rol:string;
}

export async function GET(){
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken");
    if(!token)
    {
        return NextResponse.json(null,{status:400});
    }

    
    const decoded = jwt.verify(token.value,process.env.JWT_SECRET!) as Payload;


    return NextResponse.json({name:decoded.sub,email:decoded.email,rol:decoded.rol});
}