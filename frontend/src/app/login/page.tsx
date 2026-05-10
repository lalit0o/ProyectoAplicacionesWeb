'use client'

import Form from 'next/form'
import { useState } from 'react'
import Link from 'next/link';

export default function Login() {

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
            const data = await res.json();
            console.log(data);

        } catch (error) {
            console.log(error);
        }






    }

    return (<div className=" min-h-screen w-full flex flex-col  items-center">

        <div className="w-full max-w-sm bg-gray-100 p-6 rounded-2xl shadow-md">
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
        </div>


    </div>)

}