"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AutorForm from "@/app/componentes/AutorForm";

async function getAutores() {
  const res = await fetch("http://localhost:5000/autor");
  if (!res.ok) throw new Error("Failed to fetch autores");
  return res.json();
}

export default function AdminAutores() {
  const [autores, setAutores] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No estás autenticado. Por favor, inicia sesión.");
      router.push("/bibliotecatic");
      return;
    }
    getAutores()
      .then(setAutores)
      .catch((error) => {
        console.error("Error fetching autores:", error);
        alert("Tu sesión ha expirado o no tienes permisos. Por favor, inicia sesión de nuevo.");
        localStorage.removeItem("token");
        router.push("/bibliotecatic");
      });
  }, [router]);

  async function addAutor(formData) {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    const res = await fetch("http://localhost:5000/autor", {
      method: "POST",
      body: JSON.stringify({
        nombre: formData.get("nombre"),
        biografia: formData.get("biografia"),
        fotoUrl: formData.get("fotoUrl"),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Failed to add autor");
    // Opcional: recargar la lista de autores aquí
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">Administrar Autores</h1>
      <AutorForm onSubmit={addAutor} />
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Lista de Autores</h2>
        <ul className="space-y-4">
          {autores.map((autor) => (
            <li key={autor.id} className="flex items-center justify-between border p-4 rounded">
              <div>
                <h3 className="text-xl">{autor.nombre}</h3>
                <p className="text-gray-600">
                  {autor.biografia.substring(0, 100)}...
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
