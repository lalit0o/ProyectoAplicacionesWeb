'use client'

import { useState } from "react";



export default function UserProfile({ user }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button onMouseEnter={() => setIsOpen(!isOpen)} onMouseLeave={()=>setIsOpen(!isOpen)}>
                👤
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