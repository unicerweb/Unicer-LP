import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { deleteItem, setItemActive, updateItem } from "@/lib/catalog";
import { ITEM_ICONS, type ItemInput } from "@/types/catalog";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;
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
    const item = await updateItem(id, input);
    if (!item) {
      return NextResponse.json({ error: "Item não encontrado" }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao atualizar item" },
      { status: 400 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json()) as { active?: boolean };

  if (typeof body.active !== "boolean") {
    return NextResponse.json({ error: "Campo active é obrigatório" }, { status: 400 });
  }

  const item = await setItemActive(id, body.active);
  if (!item) {
    return NextResponse.json({ error: "Item não encontrado" }, { status: 404 });
  }

  return NextResponse.json(item);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const removed = await deleteItem(id);

  if (!removed) {
    return NextResponse.json({ error: "Item não encontrado" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
