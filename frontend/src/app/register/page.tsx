'use client'

import Form from 'next/form'
import { useState } from 'react'
import { RegisterService } from './registerService';
import Link from 'next/link';
import { useCartStore } from '@/store/useProductStore';
import MensajeModal from "@/components/ModalKyanite";

export default function Register() {

    const modalOpen = useCartStore((state) => state.modalOpen);
    const setModalOpen = useCartStore((state) => state.setModalOpen);

    const [isRegister, setIsRegister] = useState<boolean>(false);

    const [modalTitulo, setModalTitulo] = useState<string>('');
    const [modalMensaje, setModalMensaje] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [nombre, setNombre] = useState<string>('');
    const [telefono, setTelefono] = useState<string>('');

    const cambiarModal = (titulo, mensaje) => {
        setModalTitulo(titulo);
        setModalMensaje(mensaje);
        setModalOpen(true);

    }

    const handleLogin = () => {
        setModalOpen(false);

        if (isRegister === true) {
            window.location.assign('/login');
        }

    }

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

    const handleRepeatPasswordChange = (event) => {
        setRepeatPassword(event.target.value);
    }

    const handleSubmit = async (event) => {

        event.preventDefault();
        if (!email || !password || !nombre) {
            cambiarModal('Campos incompletos', 'No has ingresado todos los campos en el formulario.');

            console.log("Debes ingresar todos los parámetros");
        }

        if(password !==repeatPassword){
            cambiarModal('Error','Las contraseñas ingresadas deben coincidir');
            return;
        }
        try {
            const res = await fetch('/api/auth/register', {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ email, password, nombre, telefono })
            });
            if (res.status === 400) {
                cambiarModal('Error', 'El correo ingresado ya se encuentra vinculado a otra cuenta.')
                return;
            }
            if (res.status === 500) {
                cambiarModal('Lo sentimos', 'Hubo un problema en el servidor. Inténtelo más tarde.')
            }
            if (res.status === 201) {
                cambiarModal('¡Éxito!', 'Ya puedes iniciar sesión y navegar por la tienda.')
                setIsRegister(true);
            }



        } catch (error) {
            cambiarModal('Error', 'Hubo un error en el servidor. Por favor, inténtelo más tarde.');
        }
    }

    return (
        <div className=" min-h-screen w-full flex flex-col  items-center">

            <div className="w-full max-w-sm bg-gray-100 p-6 rounded-2xl shadow-md">
                <h1 className='mb-10 text-2xl text-center'>Registrarse</h1>


                <Form onSubmit={handleSubmit} action={''}>
                    <div className="flex flex-col gap-4">
                        <label>Nombre:</label>
                        <input
                            className='border rounded-lg p-2'
                            type="text"
                            value={nombre}
                            onChange={handleNombreChange}
                            placeholder='Ej. Brandon Solis' />
                        <label>Email:</label>
                        <input
                            className='border rounded-lg p-2'
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder='example@hotmail.com' />

                        <label>Contraseña: </label>
                        <input
                            className='border rounded-lg p-2'
                            type="password"
                            value={password}
                            onChange={handlePasswordChange} />
                        <label>Repetir contraseña: </label>
                        <input
                            className='border rounded-lg p-2'
                            type="password"
                            value={repeatPassword}
                            onChange={handleRepeatPasswordChange} />
                        <label>Teléfono (opcional):</label>
                        <input
                            className='border rounded-lg p-2'
                            type="tel"
                            value={telefono}
                            onChange={handleTelefonoChange}
                            placeholder='123-456-7890'
                            maxLength={10} />
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

            <MensajeModal
                open={modalOpen}
                onClose={handleLogin}
                variant="anuncio"
                titulo={modalTitulo}
            >
                <p className="text-zinc-600">
                    {modalMensaje}
                </p>

            </MensajeModal>


        </div>)

}