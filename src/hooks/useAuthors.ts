"use client";
import { useEffect } from "react";
import { api } from "@/lib/api";
import { useAuthorsStore } from "@/store/authors";
import type { Author } from "@/types/Author";

export function useAuthors() {
  const { authors, set, add, update, remove } = useAuthorsStore();

  // Requisito: obtener datos con useEffect
  useEffect(() => {
    if (authors.length === 0) api.list().then(set);
  }, [authors.length, set]);

  return {
    authors,
    create: async (a: Author) => add(await api.create(a)),
    edit:   async (id: number, a: Author) => update(await api.update(id, a)),
    del:    async (id: number) => { await api.remove(id); remove(id); },
  };
}
