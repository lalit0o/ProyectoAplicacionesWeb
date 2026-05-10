'use client'

import { useState } from "react";
import { User } from 'lucide-react';

// type user ={





export default function UserProfile() {
    const [isOpen, setIsOpen] = useState(false);
    const user = {name:"Josesito",email:"josesito@hotmail.com"}

    return (
        <div className="relative">
            <button onMouseEnter={() => setIsOpen(!isOpen)} onMouseLeave={() => setIsOpen(!isOpen)}>
                <User className="h-5 w-5" />


            </button>

            {isOpen && (
                <div className="absolute right-0 top-10 bg-white shadow-lg p-4 rounded w-48">
                    {user ? (
                        <>
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </>

                    ) : (<p>
                        No has iniciado sesión.
                    </p>)}
                </div>
            )}
        </div>


    )






}