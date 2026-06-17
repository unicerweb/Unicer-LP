import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { addItem } from "@/lib/catalog";
import { ITEM_ICONS, type ItemInput } from "@/types/catalog";

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const body = (await request.json()) as ItemInput;

  if (!body.categoryId || !body.title?.trim()) {
    return NextResponse.json(
      { error: "Categoria e título são obrigatórios" },
      { status: 400 }
    );
  }

  const summary = body.summary?.trim() || body.description?.trim();
  const description = body.description?.trim() || summary;

  if (!summary) {
    return NextResponse.json(
      { error: "Resumo ou descrição é obrigatório" },
      { status: 400 }
    );
  }

  const input: ItemInput = {
    ...body,
    summary,
    description: description || summary,
  };

  if (body.icon && !ITEM_ICONS.includes(body.icon)) {
    return NextResponse.json({ error: "Ícone inválido" }, { status: 400 });
  }

  try {
    const item = await addItem(input);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao criar item" },
      { status: 400 }
    );
  }
}
