// src/lib/api.ts
import type { Author } from "@/types/Author";
import type { Book } from "@/types/Book";
import type { Prize } from "@/types/Prize";
import type { Review } from "@/types/Review";
export const API =
  process.env.NEXT_PUBLIC_API_BASE?.replace(/\/$/, "") || "http://127.0.0.1:8080";

async function fetchJSON<T>(
  path: string,
  init?: RequestInit & { json?: unknown }
): Promise<T> {
  const url = `${API}${path}`;
  const { json, ...rest } = init ?? {};
  const res = await fetch(url, {
    cache: "no-store",
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(rest.headers || {}),
    },
    body: json !== undefined ? JSON.stringify(json) : rest.body,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} - ${text}`);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const authorsApi = {
  list: (): Promise<Author[]> => fetchJSON<Author[]>("/authors"),

  create: (a: Author): Promise<Author> =>
    fetchJSON<Author>("/authors", { method: "POST", json: a }),

  update: (id: number, a: Author): Promise<Author> =>
    fetchJSON<Author>(`/authors/${id}`, { method: "PUT", json: a }),

  remove: (id: number): Promise<void> =>
    fetchJSON<void>(`/authors/${id}`, { method: "DELETE" }),
};

export const booksApi = {
  list: (): Promise<Book[]> => fetchJSON<Book[]>("/books"),

  detail: (id: number | string): Promise<Book> =>
    fetchJSON<Book>(`/books/${id}`),

  create: (b: Partial<Book>): Promise<Book> =>
    fetchJSON<Book>("/books", { method: "POST", json: b }),

  addReview: (
    bookId: number | string,
    review: Partial<Review>
  ): Promise<Review> =>
    fetchJSON<Review>(`/books/${bookId}/reviews`, {
      method: "POST",
      json: review,
    }),
};

export const prizesApi = {
  create: (p: Partial<Prize>): Promise<Prize> =>
    fetchJSON<Prize>("/prizes", { method: "POST", json: p }),
};

export const relationsApi = {

  addBookToAuthor: (authorId: number, bookId: number): Promise<void> =>
    fetchJSON<void>(`/authors/${authorId}/books/${bookId}`, {
      method: "POST",
    }),

  addPrizeToAuthor: (prizeId: number, authorId: number): Promise<void> =>
    fetchJSON<void>(`/prizes/${prizeId}/author/${authorId}`, {
      method: "POST",
    }),
};

export const api = {
  list: authorsApi.list,
  create: authorsApi.create,
  update: authorsApi.update,
  remove: authorsApi.remove,
  books: booksApi,
  prizes: prizesApi,
  relations: relationsApi,
};

