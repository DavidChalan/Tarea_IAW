'use client'
import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image";
import { Suspense, useState } from "react";
// import Link from "next/link";
import { getDictionary } from "@/componentes/diccionario";
import "bootstrap/dist/css/bootstrap.min.css";
// import AddBootstrap from "@/AddBootstrap";
import NavBar from "./navbar/nav";


//estas son font donde mas abajo la utilizamos 
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata = {
//   title: "Página prinicpal de IAW",
//   description: "Curso 2024/25",
//   icons: {
//     icon: '/buscar.png'
//   }
// };


// function Cargando() {
//   return (
//     <Image height={100} width={100} className="imagen" src="/Loading_2.gif" alt="cargando"></Image>
//   )
// }

export default function Applayout({ children }) {
  // idiomas
  let [idioma, setIdioma] = useState('en');
  let dict = getDictionary(idioma);

  const changeLanguage = (lang) => {
    setIdioma(lang);
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}> {/* clases dinamicas para aplicar fuentes personalizadas con localFont */}
        <header><Image src="https://www.impericon.com/cdn/shop/collections/20161101_pokemon_mobile_2x_0e5e6082-2584-43d3-aba2-6f51082fee6a.jpg?v=1720177600" width="1000" height="400" alt="Cabecera de la página" unoptimized="true"></Image></header>
          {/* <Link href="/">{dict.home}</Link> - 
            <Link href="/pokemonReact">Pokemon React</Link> - 
            <Link href="/esperando">{dict.esperando}</Link> */}
          <NavBar />
          <button onClick={() => changeLanguage('es')} className="p-2 rounded-full hover:bg-gray-200">
            <Image src="/spain.png" alt="Español" width={24} height={24} />
          </button>
          <button onClick={() => changeLanguage('en')} className="p-2 rounded-full hover:bg-gray-200">
            <Image src="/uk.png" alt="Inglés" width={24} height={24} />
          </button>
        <main>
          <h1>{dict.title}</h1>
          <h2>{dict.description}</h2>
          {children}</main>
      </body>
    </html>
  );
}
