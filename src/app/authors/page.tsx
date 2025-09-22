"use client";
import Link from "next/link";
import { useAuthors } from "@/hooks/useAuthors";
import BackHomeBar from "@/components/BackHomeBar";

export default function AuthorsPage() {
  const { authors, del } = useAuthors();

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <BackHomeBar title="Autores" />
        <Link className="px-3 py-2 rounded-md bg-black text-white" href="/authors/create">
          Crear autor
        </Link>
      </div>
      <ul className="grid sm:grid-cols-2 gap-4">
        {authors.map(a => (
          <li key={a.id} className="rounded-2xl shadow p-4 flex gap-3">
            <img src={a.image} alt={a.name} className="w-20 h-20 rounded object-cover" />
            <div className="flex-1">
              <h2 className="font-medium">{a.name}</h2>
              <p className="text-sm opacity-80 line-clamp-3">{a.description}</p>
              <div className="mt-3 flex gap-2">
                <Link className="px-2 py-1 border rounded" href={`/authors/${a.id}/edit`}>Editar</Link>
                <button className="px-2 py-1 border rounded" onClick={() => a.id && del(a.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
