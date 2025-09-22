"use client";
import { useRouter } from "next/navigation";
import { useAuthors } from "@/hooks/useAuthors";
import AuthorForm from "@/components/AuthorForm";
import BackHomeBar from "@/components/BackHomeBar";   // <- importa
import { useState } from "react";

export default function CreateAuthorPage() {
  const router = useRouter();
  const { create } = useAuthors();
  const [file, setFile] = useState<File | null>(null);

  async function uploadFileIfNeeded(): Promise<string | null> {
    if (!file) return null;
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    if (!res.ok) throw new Error("Error subiendo imagen");
    const { url } = await res.json();
    return url as string;
  }

  return (
    <main className="p-6">
      <BackHomeBar title="Crear autor" /> 
      <AuthorForm
        onFileSelected={setFile}
        onSubmit={async (d) => {
          const uploadedUrl = await uploadFileIfNeeded();
          const image = uploadedUrl ?? d.image ?? "";
          await create({ ...d, image } as any);
          router.push("/authors");
        }}
        submitText="Crear"
      />
    </main>
  );
}
