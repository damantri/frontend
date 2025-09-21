import { NextResponse } from "next/server";
const BASE = process.env.NEXT_PUBLIC_API_BASE!;

export async function GET() {
  const r = await fetch(`${BASE}/api/authors`, { cache: "no-store" });
  return NextResponse.json(await r.json(), { status: r.status });
}

export async function POST(req: Request) {
  const body = await req.json();
  const r = await fetch(`${BASE}/api/authors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return NextResponse.json(await r.json(), { status: r.status });
}
