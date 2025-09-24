"use client";

import { useState, FormEvent } from "react";
import { API } from "@/lib/api";

export default function AddReview({ bookId }: { bookId: number }) {
  const [source, setSource] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState<number | "">("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const body: any = { source, description };
    if (rating !== "") body.rating = Number(rating);

    const res = await fetch(`${API}/books/${bookId}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      alert("Error creando review");
      return;
    }
    location.reload();
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 border rounded p-4 space-y-3">
      <h3 className="font-semibold">Agregar review</h3>
      <input
        className="w-full border rounded p-2"
        placeholder="Fuente / Autor del review"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        required
      />
      <textarea
        className="w-full border rounded p-2"
        placeholder="Descripción / Comentario"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        className="w-full border rounded p-2"
        type="number" min={1} max={5} step={1}
        placeholder="Rating (1 a 5) - opcional"
        value={rating}
        onChange={(e) => setRating(e.target.value === "" ? "" : Number(e.target.value))}
      />
      <button className="px-3 py-2 rounded bg-black text-white">Guardar review</button>
    </form>
  );
}
