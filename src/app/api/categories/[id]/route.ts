import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import {
  deleteCategory,
  setCategoryActive,
  updateCategory,
} from "@/lib/catalog";
import type { CategoryInput } from "@/types/catalog";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json()) as CategoryInput;

  if (!body.label?.trim() || !body.title?.trim() || !body.description?.trim()) {
    return NextResponse.json(
      { error: "Nome, título e descrição são obrigatórios" },
      { status: 400 }
    );
  }

  try {
    const category = await updateCategory(id, body);
    if (!category) {
      return NextResponse.json({ error: "Categoria não encontrada" }, { status: 404 });
    }
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao atualizar categoria" },
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

  const category = await setCategoryActive(id, body.active);
  if (!category) {
    return NextResponse.json({ error: "Categoria não encontrada" }, { status: 404 });
  }

  return NextResponse.json(category);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const removed = await deleteCategory(id);
    if (!removed) {
      return NextResponse.json({ error: "Categoria não encontrada" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao excluir categoria" },
      { status: 400 }
    );
  }
}
