"use client";
import { useParams, useRouter } from "next/navigation";
import { useAuthors } from "@/hooks/useAuthors";
import AuthorForm from "@/components/AuthorForm";

export default function EditAuthorPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { authors, edit } = useAuthors();
  const current = authors.find(a => String(a.id) === id);

  if (!current) return <main className="p-6">Cargando…</main>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Editar autor</h1>
      <AuthorForm
        defaultValues={current}
        onSubmit={async (d) => { await edit(Number(id), { ...current, ...d }); router.push("/authors"); }}
        submitText="Actualizar"
      />
    </main>
  );
}
