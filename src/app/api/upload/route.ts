import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic"; // evita cacheo en dev

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  // 1) Leemos el archivo
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // 2) Carpeta destino: /public/uploads
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  // 3) Guardamos con nombre único
  const safeName = file.name.replace(/\s+/g, "_");
  const filename = `${Date.now()}-${safeName}`;
  const filepath = path.join(uploadDir, filename);
  await writeFile(filepath, buffer);

  // 4) Devolvemos URL pública
  const url = `/uploads/${filename}`;
  return NextResponse.json({ url });
}
