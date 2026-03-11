'use client'
import { useFormStatus } from "react-dom";

export default function BotonSubmit(){
    const {pending}=useFormStatus();
    return (<button type="submit"disabled={pending} >{pending?"Iniciando Sesión...":"Iniciar Sesión"}</button>);
}