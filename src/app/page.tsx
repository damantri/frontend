// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-6">
        <h1 className="text-3xl font-semibold">Bookstore • Pre-parcial</h1>
        <p className="text-sm opacity-80">
          App en Next.js (App Router, TypeScript, Tailwind). Usa el backend en
          <code className="ml-1 px-2 py-0.5 rounded bg-black/5 dark:bg-white/10">
            /api/authors
          </code>
          .
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/authors"
            className="rounded-2xl border p-4 hover:shadow transition"
          >
            <h2 className="font-medium">Autores →</h2>
            <p className="text-sm opacity-80">
              Ver lista de autores, editar y eliminar.
            </p>
          </Link>

          <Link
            href="/authors/create"
            className="rounded-2xl border p-4 hover:shadow transition"
          >
            <h2 className="font-medium">Crear autor →</h2>
            <p className="text-sm opacity-80">
              Formulario controlado con RHF + Zod.
            </p>
          </Link>
        </div>

        <ul className="text-sm list-disc pl-5 opacity-80">
          <li>Routing con App Router (no react-router).</li>
          <li>Código fuertemente tipado (.ts / .tsx).</li>
          <li>Estado global con Zustand; local con useState.</li>
          <li>Datos vía useEffect en un custom hook.</li>
        </ul>
      </div>
    </main>
  );
}
