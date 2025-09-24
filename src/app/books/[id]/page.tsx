import { api } from "@/lib/api";
import BackHomeBar from "@/components/BackHomeBar";
import type { Book } from "@/types/Book";
import AddReview from "@/components/AddReview"; 

async function getBook(id: string): Promise<Book> {
  return api<Book>(`/books/${id}`);
}

export default async function BookDetailPage({ params }: { params: { id: string } }) {
  const book = await getBook(params.id);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <BackHomeBar title={`Libro: ${book.name}`} />

      <div className="flex gap-6">
        <img src={book.image} alt={book.name} className="w-40 h-40 object-cover rounded" />
        <div>
          <h1 className="text-2xl font-semibold mb-2">{book.name}</h1>
          <p className="opacity-80 mb-2">{book.description}</p>
          <p className="text-sm opacity-70">
            Publicación: {new Date(book.publishingDate).toLocaleDateString()}
          </p>
          {book.editorial?.name && (
            <p className="text-sm opacity-70">Editorial: {book.editorial.name}</p>
          )}
        </div>
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Reviews</h2>
        <ul className="space-y-3">
          {(book.reviews ?? []).map((r) => (
            <li key={r.id} className="border rounded p-3">
              <p className="font-medium">{r.source ?? "Anónimo"}</p>
              <p className="opacity-80">{r.description}</p>
              {"rating" in r && r.rating != null && (
                <p className="text-sm opacity-70 mt-1">Rating: {r.rating}/5</p>
              )}
            </li>
          ))}
          {(!book.reviews || book.reviews.length === 0) && (
            <p className="opacity-70">Este libro aún no tiene reviews.</p>
          )}
        </ul>
      </section>

      <AddReview bookId={book.id} />
    </main>
  );
}
