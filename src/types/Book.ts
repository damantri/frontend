import type { Review } from "./Review";

export interface Book {
  id: number;
  name: string;
  description: string;
  image: string;
  publishingDate: string; // YYYY-MM-DD
  editorial?: { id?: number; name?: string };
  reviews?: Review[];
}
