import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { addItemImage, removeItemImage } from "@/lib/catalog";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "Arquivo é obrigatório" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const item = await addItemImage(id, { name: file.name, buffer });

    if (!item) {
      return NextResponse.json({ error: "Item não encontrado" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao enviar imagem" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const imagePath = searchParams.get("path");

  if (!imagePath) {
    return NextResponse.json({ error: "Caminho da imagem é obrigatório" }, { status: 400 });
  }

  try {
    const item = await removeItemImage(id, imagePath);

    if (!item) {
      return NextResponse.json({ error: "Item não encontrado" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao remover imagem" },
      { status: 400 }
    );
  }
}
