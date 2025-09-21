import { NextResponse } from "next/server";
const BASE = process.env.NEXT_PUBLIC_API_BASE!;

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const r = await fetch(`${BASE}/api/authors/${params.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return NextResponse.json(await r.json(), { status: r.status });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const r = await fetch(`${BASE}/api/authors/${params.id}`, { method: "DELETE" });
  return NextResponse.json(await r.json().catch(() => ({})), { status: r.status });
}
