// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-start justify-center p-8">
      <div className="max-w-2xl w-full space-y-6 mt-6">
        <h1 className="text-3xl font-thin">Frontend Daniel Mancilla - 202221038</h1>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/authors" className="rounded-2xl border p-4 hover:shadow transition">
            <h2 className="font-medium">Autores</h2>
          </Link>
          <Link href="/authors/create" className="rounded-2xl border p-4 hover:shadow transition">
            <h2 className="font-medium">Crear autor</h2>
          </Link>
        </div>
      </div>
    </main>
  );
}

