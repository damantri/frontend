"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BackHomeBar from "@/components/BackHomeBar";
import { api } from "@/lib/api";

const schema = z.object({

  name: z.string().min(2, "Nombre requerido"),
  image: z.string().optional(), 
  description: z.string().min(5, "Descripción requerida"),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD"),

  bookName: z.string().min(2, "Título requerido"),
  bookDescription: z.string().min(5, "Descripción requerida"),
  bookImage: z.string().optional(),
  bookPublishingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD"),

  prizeName: z.string().min(2, "Nombre de premio requerido"),
  prizeOrganization: z.string().min(2, "Organización requerida"),
  prizeDescription: z.string().min(2, "Descripción requerida"),
});
type FormData = z.infer<typeof schema>;

export default function CreateAuthorPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <main className="p-6 max-w-3xl">
      <BackHomeBar title="Crear autor (con libro y premio)" />
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (d) => {
          const author = await api<{ id: number }>("/authors", {
            method: "POST",
            body: JSON.stringify({
              name: d.name,
              image: d.image ?? "",
              description: d.description,
              birthDate: d.birthDate,
            }),
          });
          const book = await api<{ id: number }>("/books", {
            method: "POST",
            body: JSON.stringify({
              name: d.bookName,
              description: d.bookDescription,
              image: d.bookImage ?? "",
              publishingDate: d.bookPublishingDate,
            }),
          });
          await api<void>(`/authors/${author.id}/books/${book.id}`, {
            method: "POST",
          });

          const prize = await api<{ id: number }>("/prizes", {
            method: "POST",
            body: JSON.stringify({
              name: d.prizeName,
              organization: d.prizeOrganization,
              description: d.prizeDescription,
            }),
          });

          await api<void>(`/prizes/${prize.id}/author/${author.id}`, {
            method: "POST",
          });

          router.push("/authors");
        })}
      >
        <h2 className="text-xl font-semibold mt-2">Autor</h2>
        <input className="w-full border rounded p-2" placeholder="Nombre" {...register("name")} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        <input className="w-full border rounded p-2" placeholder="URL de imagen (opcional)" {...register("image")} />
        <textarea className="w-full border rounded p-2" placeholder="Descripción" {...register("description")} />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        <input className="w-full border rounded p-2" type="date" {...register("birthDate")} />
        {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate.message}</p>}

        <h2 className="text-xl font-semibold mt-6">Libro (obligatorio)</h2>
        <input className="w-full border rounded p-2" placeholder="Título" {...register("bookName")} />
        {errors.bookName && <p className="text-red-500 text-sm">{errors.bookName.message}</p>}
        <textarea className="w-full border rounded p-2" placeholder="Descripción" {...register("bookDescription")} />
        {errors.bookDescription && <p className="text-red-500 text-sm">{errors.bookDescription.message}</p>}
        <input className="w-full border rounded p-2" placeholder="URL de imagen (opcional)" {...register("bookImage")} />
        <input className="w-full border rounded p-2" type="date" {...register("bookPublishingDate")} />
        {errors.bookPublishingDate && <p className="text-red-500 text-sm">{errors.bookPublishingDate.message}</p>}

        <h2 className="text-xl font-semibold mt-6">Premio (obligatorio)</h2>
        <input className="w-full border rounded p-2" placeholder="Nombre del premio" {...register("prizeName")} />
        {errors.prizeName && <p className="text-red-500 text-sm">{errors.prizeName.message}</p>}
        <input className="w-full border rounded p-2" placeholder="Organización" {...register("prizeOrganization")} />
        {errors.prizeOrganization && <p className="text-red-500 text-sm">{errors.prizeOrganization.message}</p>}
        <textarea className="w-full border rounded p-2" placeholder="Descripción" {...register("prizeDescription")} />
        {errors.prizeDescription && <p className="text-red-500 text-sm">{errors.prizeDescription.message}</p>}

        <button disabled={isSubmitting} className="px-3 py-2 rounded bg-black text-white mt-4">
          {isSubmitting ? "Guardando..." : "Crear autor + libro + premio"}
        </button>
      </form>
    </main>
  );
}
