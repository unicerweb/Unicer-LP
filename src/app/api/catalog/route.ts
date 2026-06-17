import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getActiveCatalog, getCatalog } from "@/lib/catalog";

export async function GET() {
  const authenticated = await isAuthenticated();

  if (authenticated) {
    const catalog = await getCatalog();
    return NextResponse.json(catalog);
  }

  const categories = await getActiveCatalog();
  return NextResponse.json({ categories, items: categories.flatMap((c) => c.items) });
}
