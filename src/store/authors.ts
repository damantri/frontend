"use client";
import { create } from "zustand";
import type { Author } from "@/types/Author";

type S = {
  authors: Author[];
  set: (as: Author[]) => void;
  add: (a: Author) => void;
  update: (a: Author) => void;
  remove: (id: number) => void;
};

export const useAuthorsStore = create<S>((set) => ({
  authors: [],
  set: (as) => set({ authors: as }),
  add: (a) => set((s) => ({ authors: [a, ...s.authors] })),
  update: (a) => set((s) => ({ authors: s.authors.map(x => x.id === a.id ? a : x) })),
  remove: (id) => set((s) => ({ authors: s.authors.filter(x => x.id !== id) })),
}));
