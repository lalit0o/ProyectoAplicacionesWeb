import { NextResponse } from "next/server";
//Esta mamada es para simular un backend que reciba un POST con email y contraseña,




export async function POST(request){

    const body= await request.json()
    const {email,contrasenia}=body;
    console.log(email);
    console.log(contrasenia);

    const persona={email:"josesito@hotmail.com",contrasenia:"hola12345"};

    if(email===persona.email && contrasenia===persona.contrasenia)
    {
        return NextResponse.json({success:true},{status:200});

    }
    else{
        return NextResponse.json({success:false},{status:401});
    }

}


