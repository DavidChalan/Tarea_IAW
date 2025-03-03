'use client'
import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image";
import { Suspense, useState } from "react";
import { getDictionary } from "@/componentes/diccionario";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "/componentes/NavBar.jsx";
import SecondNavbar from "./componentes/Secondnavbar";

// estas son font donde más abajo la utilizamos
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

export default function Applayout({ children }) {
  // idiomas
  let [idioma, setIdioma] = useState('es');
  let dict = getDictionary(idioma);

  const changeLanguage = (lang) => {
    setIdioma(lang);
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header style={{ width: '100%', height: 'auto' }}>
          <Image 
            src="https://www.impericon.com/cdn/shop/collections/20161101_pokemon_mobile_2x_0e5e6082-2584-43d3-aba2-6f51082fee6a.jpg?v=1720177600" 
            width={1000} 
            height={400} 
            alt="Cabecera de la página" 
            unoptimized={true}
            layout="responsive" // Esto hace que la imagen sea responsive
          />
        </header>
        <NavBar idioma={idioma} changeLanguage={changeLanguage} />
        <SecondNavbar/>
        {children}
      </body>
    </html>
    
  );
}
