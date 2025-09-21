"use client";
import { useRouter } from "next/navigation";
import { useAuthors } from "@/hooks/useAuthors";
import AuthorForm from "@/components/AuthorForm";

export default function CreateAuthorPage() {
  const router = useRouter();
  const { create } = useAuthors();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Crear autor</h1>
      <AuthorForm
        onSubmit={async (d) => { await create(d as any); router.push("/authors"); }}
        submitText="Crear"
      />
    </main>
  );
}
