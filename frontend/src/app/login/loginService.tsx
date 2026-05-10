import { cookies } from "next/headers"

type Usuario = {
    email: string
    password: string
}


type Props = {
    usuario: Usuario
}

export async function LoginService({ usuario }: Props) {
    const email = usuario.email;
    const password = usuario.password;
    try {
        const res = await fetch('https://localhost:3000/api/auth/login', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (!data) {
            return { error: data.message }
        }

        const cookieStore = await cookies();

        cookieStore.set("accessToken", data.token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/"
        })
        return { success: true, data }




    } catch (error) {
        return { mensaje: "Error al conectarse con el servidor: ", error }//quitar esto despues
    }
}