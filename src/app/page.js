import BotonSubmit from "@/components/BotonSubmit";
import Footer from "@/components/Footer";
import { redirect } from "next/navigation";


export default function login() {

  async function iniciarSesion(datos) {

    'use server'
    //logica para validar usuario
    const email = datos.get("email");
    const contrasenia = datos.get("contrasenia");
    const res=await fetch("http://localhost:3000/api/usuario",{
      method:'POST',
      body:JSON.stringify({email,contrasenia}),
      headers:{'Content-Type':'application/json'}
    });

    const respuesta =await res.json();

    if (respuesta.success){
      console.log("Acceso permitido");
      redirect("/home");
    }
    else{
      console.log("Acceso denegado");
    }


    
  }
  return (<div>
    <h1 className="flex justify-center text-6xl ">Bienvenido a nuestra página</h1>

    <form action={iniciarSesion} className="p-10 flex flex-col gap-4">
      <input name="email" type="email" placeholder="Email" className="border p-2" required />
      <input name="contrasenia" type="password" placeholder="Contraseña" className="border p-2" required/>
      <BotonSubmit/>
    </form>
    <Footer />
  </div>

  )

}