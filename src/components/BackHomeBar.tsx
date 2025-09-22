"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BackHomeBar({ title }: { title?: string }) {
  const router = useRouter();
  const btn =
    "px-3 py-1.5 rounded border border-white/20 hover:bg-white/10 transition";

  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <button onClick={() => router.back()} className={btn}>Volver</button>
        <Link href="/" className={btn}>Home</Link>
      </div>
      {title ? <h1 className="text-2xl font-semibold">{title}</h1> : null}
    </div>
  );
}
