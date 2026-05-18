'use client'

import Form from 'next/form'
import { useEffect, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MensajeModal from "@/components/ModalKyanite";
import { useCartStore } from '@/store/useProductStore';

export default function Login() {
    const modalOpen = useCartStore((state) => state.modalOpen);
    const setModalOpen = useCartStore((state) => state.setModalOpen);

    const router = useRouter();

    const [auth, setAuth] = useState<boolean | null>(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event) => {

        event.preventDefault();
        if (!email || !password) {
            console.log("Debes ingresar todos los parámetros");
            return;
        }

        try {
            const res = await fetch('/api/auth/login', {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            if (res.status === 200) {
                setModalOpen(true);
                setTimeout(() => {
                    window.location.reload();
                    window.location.assign("/categoria/todos");
                }, 1000)

            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function verificar() {
            const res = await fetch("/api/cookie", {
                method: "GET"
            });
            console.log(res);
            if (res.ok) {
                setAuth(true);
            }
            else {
                setAuth(false);
            }



        }
        verificar();


    }, []);

    return (

        <div className=" min-h-screen w-full flex flex-col  items-center">



            <div className="w-full max-w-sm bg-gray-100 p-6 rounded-2xl shadow-md">
                {auth ? (
                    <p>Ya has iniciado sesión, por lo cual no es necesario volver a hacerlo.</p>

                ) : (<>
                    <h1 className='mb-10 text-2xl text-center'>Iniciar sesión</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4">
                            <label >Email:</label>
                            <input
                                className='border rounded-lg p-2'
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                required />

                            <label>Contraseña: </label>
                            <input
                                className='border rounded-lg p-2'
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                required />
                        </div>
                        <div className=' flex flex-col justify-center '>
                            <div className='flex justify-center mb-4'>
                                <button type="submit" className='bg-black text-white rounded-xl mt-5 p-2 hover:bg-gray-800'>Iniciar sesión</button>
                            </div>
                            <div>
                                <p>¿No tienes una cuenta aún? <Link className="text-gray-500" href='/register'>Registrate ahora</Link></p>

                            </div>



                        </div>
                    </form>

                    <MensajeModal
                        open={modalOpen}
                        onClose={() => setModalOpen(false)}
                        variant="anuncio"
                        titulo="Inicio de sesión exitoso"
                    >
                        <p className="text-zinc-600">
                            ¡Ya puedes navegar y agregar artículos a tu carrito!
                        </p>

                    </MensajeModal>
                </>

                )}





            </div>


        </div>)

}