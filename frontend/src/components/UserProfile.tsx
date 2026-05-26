'use client'

import { useState, useEffect } from "react";
import { User } from 'lucide-react';
import Link from "next/link";
import MensajeModal from "@/components/ModalKyanite";
import { useCartStore } from "@/store/useProductStore";


// type user ={

type Token = {
    name: string;
    email: string;
    rol: string;
}



export default function UserProfile() {

    const modalOpen = useCartStore((state) => state.modalOpen);
    const setModalOpen = useCartStore((state) => state.setModalOpen);

    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState<Token | null>(null);
    async function handleLogOut() {
        await fetch("/api/logout", {
            method: "POST"
        });
        setModalOpen(true);

        setTimeout(() => {
            window.location.reload();
            window.location.assign("/login");

        }, 1000)




    }
    useEffect(() => {
        async function obtenerSesion() {
            const response = await fetch("/api/cookie", {
                method: "GET"
            });
            const data = await response.json();
            setData(data);



        }
        obtenerSesion();


    }, [])

    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)}>
                <User className="h-5 w-5" />
            </button>
            {isOpen && (
                <div className="absolute right-0 top-10 bg-white shadow-lg p-4 rounded w-48">
                    {data ? (
                        <>
                            <div className="flex justify-center flex-col text-center">
                                <p >Bienvenido, <span className="font-bold">{data.name}</span></p>
                                <br />
                                <p>Rol: <span className="font-bold">{data.rol}</span></p>
                                <div className="flex justify-center mt-4">
                                    <button type="button" className="bg-black text-white px-4 py-2 rounded-2xl" onClick={handleLogOut} >Cerrar sesión</button>
                                </div>
                            </div>

                            <MensajeModal
                                open={modalOpen}
                                onClose={() => setModalOpen(false)}
                                variant="anuncio"
                                titulo="Cierre de sesión exitoso"
                            >
                                <p className="text-zinc-600">
                                    ¡Hasta pronto!
                                </p>

                            </MensajeModal>

                        </>

                    ) : (
                        <div className="flex text-center">
                            <p className="">
                                No has iniciado sesión.<br />
                                Dirígete a  <Link href="/login" className="text-purple-300">Iniciar sesión</Link> para autenticarte.  <br />
                            </p>
                        </div>)}
                </div>
            )}
        </div>
    )
}