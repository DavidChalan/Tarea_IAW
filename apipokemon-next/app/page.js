import Image from "next/image";

export default function Home() {
  return (
    <div>
           <h1>Bienvenido a la Página de Inicio</h1>
           <p>Este es el contenido de la página principal.</p>
      <img src="/header.jpg" width="500" height="400" alt="un ejemplo de imagen"></img>
      <Image src="/header.jpg" width="500" height="400" alt="ejemplo de imagen"/> 
    </div>
      );
}
