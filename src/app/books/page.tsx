import Link from "next/link";
import { api } from "@/lib/api";
import type { Book } from "@/types/Book";
import BackHomeBar from "@/components/BackHomeBar";

async function getBooks(): Promise<Book[]> {
  return api<Book[]>("/books");
}

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <BackHomeBar title="Libros" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {books.map((b) => (
          <Link
            key={b.id}
            href={`/books/${b.id}`}
            className="flex gap-4 p-4 rounded-2xl border hover:border-white/60 transition"
          >
            <img src={b.image} alt={b.name} className="w-28 h-28 object-cover rounded" />
            <div>
              <h3 className="text-lg font-semibold">{b.name}</h3>
              <p className="text-sm opacity-80 line-clamp-3">{b.description}</p>
              <p className="text-xs opacity-70 mt-1">
                Publicado: {new Date(b.publishingDate).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
