import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { addCategory } from "@/lib/catalog";
import type { CategoryInput } from "@/types/catalog";

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const body = (await request.json()) as CategoryInput;

  if (!body.label?.trim() || !body.title?.trim() || !body.description?.trim()) {
    return NextResponse.json(
      { error: "Nome, título e descrição são obrigatórios" },
      { status: 400 }
    );
  }

  if (!body.layout || !["grid", "list"].includes(body.layout)) {
    return NextResponse.json({ error: "Layout inválido" }, { status: 400 });
  }

  try {
    const category = await addCategory(body);
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao criar categoria" },
      { status: 400 }
    );
  }
}
