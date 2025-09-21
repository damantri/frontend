import { Author } from "@/types/Author";
const base = "/api/authors";

export const api = {
  list: async (): Promise<Author[]> =>
    (await fetch(base, { cache: "no-store" })).json(),

  create: async (a: Author): Promise<Author> =>
    (await fetch(base, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(a),
    })).json(),

  update: async (id: number, a: Author): Promise<Author> =>
    (await fetch(`${base}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(a),
    })).json(),

  remove: async (id: number): Promise<void> => {
    await fetch(`${base}/${id}`, { method: "DELETE" });
  },
};
