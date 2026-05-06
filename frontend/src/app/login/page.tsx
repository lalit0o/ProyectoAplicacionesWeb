'use client'

import Form from 'next/form'
import {useState} from 'react'

export default function Login() {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleEmailChange= (event)=>{
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event)=>{
        setPassword(event.target.value);
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        console.log('Email',email);
        console.log('contraseña',password);

    }

    return (<div className="flex flex-row justify-center">

        <h1>Iniciar sesión</h1>

        <Form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange} />

                <label>Contraseña: </label>
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange} />
            </div>

            <button type="submit">Iniciar sesión</button>
        </Form>


    </div>)

}