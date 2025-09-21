"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Author } from "@/types/Author";

const schema = z.object({
  name: z.string().min(2, "Mínimo 2 caracteres"),
  // hacemos image opcional si subes archivo
  image: z.string().url("Debe ser una URL válida").optional(),
  description: z.string().min(5, "Mínimo 5 caracteres"),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato YYYY-MM-DD"),
});
type FormData = z.infer<typeof schema>;

export default function AuthorForm({
  defaultValues,
  onSubmit,
  submitText = "Guardar",
  onFileSelected, // <<< NUEVO
}: {
  defaultValues?: Partial<Author>;
  onSubmit: (data: FormData) => Promise<void> | void;
  submitText?: string;
  onFileSelected?: (file: File | null) => void; // <<< NUEVO
}) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema), defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 max-w-lg">
      <input className="w-full border rounded p-2" placeholder="Nombre" {...register("name")} />
      {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}

      {/* URL opcional si subes archivo */}
      <input className="w-full border rounded p-2" placeholder="URL de imagen (opcional)" {...register("image")} />
      {errors.image && <p className="text-red-600 text-sm">{errors.image.message}</p>}

      {/* NUEVO: subir imagen desde el equipo */}
      <input
        type="file"
        accept="image/*"
        className="w-full border rounded p-2"
        onChange={(e) => onFileSelected?.(e.target.files?.[0] ?? null)}
      />

      <textarea className="w-full border rounded p-2" placeholder="Descripción" {...register("description")} />
      {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}

      <input className="w-full border rounded p-2" type="date" {...register("birthDate")} />
      {errors.birthDate && <p className="text-red-600 text-sm">{errors.birthDate.message}</p>}

      <button disabled={isSubmitting} className="px-3 py-2 rounded bg-black text-white">
        {submitText}
      </button>
    </form>
  );
}
