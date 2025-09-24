"use client";

import Link from "next/link";
import Image from "next/image";
import BackHomeBar from "@/components/BackHomeBar";
import { useAuthors } from "@/hooks/useAuthors";

export default function AuthorsPage() {
  const { authors, del } = useAuthors();

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-6">
        <BackHomeBar title="Autores" />
        <div className="flex gap-2">
          <Link
            href="/books"
            className="px-3 py-2 rounded-md border hover:border-white/70 transition"
          >
            Libros
          </Link>
          <Link
            href="/authors/create"
            className="px-3 py-2 rounded-md bg-black text-white hover:bg-zinc-900 transition"
          >
            Crear autor
          </Link>
        </div>
      </div>

      <ul className="grid sm:grid-cols-2 gap-5">
        {authors.map((a) => (
          <li
            key={a.id}
            className="rounded-2xl border hover:border-white/70 transition p-4 flex gap-4"
          >
            <div className="shrink-0">
              <Image
                src={a.image || "/placeholder.png"}
                alt={a.name}
                width={96}
                height={96}
                className="w-24 h-24 object-cover rounded"
              />
            </div>

            <div className="flex-1">
              <h2 className="font-semibold">{a.name}</h2>
              <p className="text-sm opacity-80 line-clamp-3">{a.description}</p>

              <div className="mt-3 flex gap-2">
                <Link
                  href={`/authors/${a.id}/edit`}
                  className="px-3 py-1.5 rounded border hover:border-white/70 transition"
                >
                  Editar
                </Link>
                <button
                  className="px-3 py-1.5 rounded border hover:bg-red-500/10 transition"
                  onClick={() =>
                    a.id &&
                    confirm(`¿Eliminar a “${a.name}”?`) &&
                    del(a.id)
                  }
                >
                  Eliminar
                </button>
              </div>
            </div>
          </li>
        ))}

        {authors.length === 0 && (
          <li className="opacity-70">No hay autores para mostrar.</li>
        )}
      </ul>
    </main>
  );
}
