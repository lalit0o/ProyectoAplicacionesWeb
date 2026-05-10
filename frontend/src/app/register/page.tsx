'use client'

import Form from 'next/form'
import { useState } from 'react'
import { RegisterService } from './registerService';
import Link from 'next/link';

export default function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleNombreChange = (event) => {
        setNombre(event.target.value);
    }
    const handleTelefonoChange = (event) => {
        setTelefono(event.target.value);
    }

    const handleSubmit = (event) => {

        event.preventDefault();
        if (!email || !password) {
            console.log("Debes ingresar todos los parámetros");
        }
        const usuario = { email: email, password: password };

        const res = RegisterService({ usuario });
        console.log(res);






    }

    return (<div className=" min-h-screen w-full flex flex-col  items-center">

        <div className="w-full max-w-sm bg-gray-100 p-6 rounded-2xl shadow-md">
            <h1 className='mb-10 text-2xl text-center'>Registrarse</h1>


            <Form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                    <label>Nombre:</label>
                    <input
                        className='border rounded-lg p-2'
                        type="email"
                        value={nombre}
                        onChange={handleNombreChange}
                        placeholder='Ej. Brandon Solis'
                        required />
                    <label>Email:</label>
                    <input
                        id='email'
                        className='border rounded-lg p-2'
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder='example@hotmail.com'
                        required />

                    <label>Contraseña: </label>
                    <input
                        className='border rounded-lg p-2'
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required />
                    <label>Teléfono:</label>
                    <input
                        className='border rounded-lg p-2'
                        type="tel"
                        value={telefono}
                        onChange={handleTelefonoChange}
                        placeholder='123-456-7890'
                        maxLength={10}
                        required />
                </div>
                <div className=' flex flex-col justify-center '>
                    <div className='flex justify-center mb-4'>
                        <button type="submit" className='bg-black text-white rounded-xl mt-5 p-2 hover:bg-gray-800'>Registrarse</button>
                    </div>
                    <div className='flex justify-center'>
                        <p>¿Ya tienes una cuenta? <Link className="text-gray-500" href='/login'>Inicia sesión</Link></p>

                    </div>



                </div>
            </Form>
        </div>


    </div>)

}