import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import {
  MAX_ITEM_IMAGES,
  type Catalog,
  type CatalogItem,
  type Category,
  type CategoryInput,
  type CategoryWithItems,
  type ItemInput,
} from "@/types/catalog";
import { discoverPecasImages } from "@/lib/pecas-images";
import { discoverMaquinasImages } from "@/lib/maquinas-images";

const DATA_PATH = path.join(process.cwd(), "data", "catalog.json");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads", "items");

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalizeItem(
  raw: Partial<CatalogItem> & Pick<CatalogItem, "id" | "categoryId" | "title">
): CatalogItem {
  const description = raw.description?.trim() ?? "";
  const summary = raw.summary?.trim() || description;

  return {
    id: raw.id,
    categoryId: raw.categoryId,
    title: raw.title,
    summary,
    description: description || summary,
    icon: raw.icon,
    images: Array.isArray(raw.images) ? raw.images.slice(0, MAX_ITEM_IMAGES) : [],
    active: raw.active !== false,
    order: raw.order ?? 0,
  };
}

async function enrichCatalogWithFolderImages(catalog: Catalog): Promise<Catalog> {
  const items = await Promise.all(
    catalog.items.map(async (item) => {
      const category = catalog.categories.find((c) => c.id === item.categoryId);
      if (!category) return item;

      let folderImages: string[] = [];
      let folderPrefix = "";

      if (category.slug === "pecas") {
        folderImages = await discoverPecasImages(item.id);
        folderPrefix = "/pecas/";
      } else if (category.slug === "maquinas") {
        folderImages = await discoverMaquinasImages(item.id);
        folderPrefix = "/maquinas/";
      } else {
        return item;
      }

      const otherImages = item.images.filter((img) => !img.startsWith(folderPrefix));
      const images = [...folderImages, ...otherImages].slice(0, MAX_ITEM_IMAGES);

      return images.length === item.images.length &&
        images.every((img, i) => img === item.images[i])
        ? item
        : { ...item, images };
    })
  );

  return { ...catalog, items };
}

async function readCatalog(): Promise<Catalog> {
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  const parsed = JSON.parse(raw) as {
    categories: Category[];
    items: Partial<CatalogItem>[];
  };

  const catalog: Catalog = {
    categories: parsed.categories,
    items: parsed.items.map((item) =>
      normalizeItem({
        id: item.id ?? randomUUID(),
        categoryId: item.categoryId ?? "",
        title: item.title ?? "",
        ...item,
      })
    ),
  };

  return enrichCatalogWithFolderImages(catalog);
}

async function saveCatalog(catalog: Catalog): Promise<void> {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(catalog, null, 2), "utf-8");
}

function sortCategories(categories: Category[]): Category[] {
  return [...categories].sort((a, b) => a.order - b.order);
}

function sortItems(items: CatalogItem[]): CatalogItem[] {
  return [...items].sort((a, b) => a.order - b.order);
}

export async function getCatalog(): Promise<Catalog> {
  return readCatalog();
}

export async function getActiveCatalog(): Promise<CategoryWithItems[]> {
  const { categories, items } = await readCatalog();

  return sortCategories(categories.filter((c) => c.active))
    .map((category) => ({
      ...category,
      items: sortItems(
        items.filter((item) => item.categoryId === category.id && item.active)
      ),
    }))
    .filter((category) => category.items.length > 0);
}

export async function getActiveProductCategories(): Promise<CategoryWithItems[]> {
  const { categories, items } = await readCatalog();

  return sortCategories(
    categories.filter((c) => c.active && c.slug !== "usinagem")
  ).map((category) => ({
    ...category,
    items: sortItems(
      items.filter((item) => item.categoryId === category.id && item.active)
    ),
  }));
}

export async function addCategory(input: CategoryInput): Promise<Category> {
  const catalog = await readCatalog();
  const slug = slugify(input.slug || input.label);

  if (catalog.categories.some((c) => c.slug === slug)) {
    throw new Error("Já existe uma categoria com este identificador");
  }

  const maxOrder = catalog.categories.reduce((max, c) => Math.max(max, c.order), 0);
  const category: Category = {
    id: randomUUID(),
    slug,
    label: input.label.trim(),
    title: input.title.trim(),
    description: input.description.trim(),
    layout: input.layout,
    highlightTitle: input.highlightTitle?.trim() || undefined,
    highlightDescription: input.highlightDescription?.trim() || undefined,
    active: true,
    order: maxOrder + 1,
  };

  catalog.categories.push(category);
  await saveCatalog(catalog);
  return category;
}

export async function updateCategory(
  id: string,
  input: CategoryInput
): Promise<Category | null> {
  const catalog = await readCatalog();
  const index = catalog.categories.findIndex((c) => c.id === id);
  if (index === -1) return null;

  const slug = slugify(input.slug || input.label);
  if (catalog.categories.some((c) => c.slug === slug && c.id !== id)) {
    throw new Error("Já existe uma categoria com este identificador");
  }

  catalog.categories[index] = {
    ...catalog.categories[index],
    slug,
    label: input.label.trim(),
    title: input.title.trim(),
    description: input.description.trim(),
    layout: input.layout,
    highlightTitle: input.highlightTitle?.trim() || undefined,
    highlightDescription: input.highlightDescription?.trim() || undefined,
  };

  await saveCatalog(catalog);
  return catalog.categories[index];
}

export async function setCategoryActive(
  id: string,
  active: boolean
): Promise<Category | null> {
  const catalog = await readCatalog();
  const index = catalog.categories.findIndex((c) => c.id === id);
  if (index === -1) return null;

  catalog.categories[index] = { ...catalog.categories[index], active };
  await saveCatalog(catalog);
  return catalog.categories[index];
}

export async function deleteCategory(id: string): Promise<boolean> {
  const catalog = await readCatalog();
  const hasItems = catalog.items.some((item) => item.categoryId === id);
  if (hasItems) {
    throw new Error("Remova ou mova os itens desta categoria antes de excluí-la");
  }

  const filtered = catalog.categories.filter((c) => c.id !== id);
  if (filtered.length === catalog.categories.length) return false;

  catalog.categories = filtered;
  await saveCatalog(catalog);
  return true;
}

export async function addItem(input: ItemInput): Promise<CatalogItem> {
  const catalog = await readCatalog();
  const category = catalog.categories.find((c) => c.id === input.categoryId);
  if (!category) throw new Error("Categoria não encontrada");

  const categoryItems = catalog.items.filter((i) => i.categoryId === input.categoryId);
  const maxOrder = categoryItems.reduce((max, i) => Math.max(max, i.order), 0);

  const item: CatalogItem = {
    id: randomUUID(),
    categoryId: input.categoryId,
    title: input.title.trim(),
    summary: input.summary.trim(),
    description: input.description.trim(),
    icon: category.layout === "grid" ? input.icon : undefined,
    images: [],
    active: true,
    order: maxOrder + 1,
  };

  catalog.items.push(item);
  await saveCatalog(catalog);
  return item;
}

export async function updateItem(
  id: string,
  input: ItemInput
): Promise<CatalogItem | null> {
  const catalog = await readCatalog();
  const index = catalog.items.findIndex((i) => i.id === id);
  if (index === -1) return null;

  const category = catalog.categories.find((c) => c.id === input.categoryId);
  if (!category) throw new Error("Categoria não encontrada");

  catalog.items[index] = {
    ...catalog.items[index],
    categoryId: input.categoryId,
    title: input.title.trim(),
    summary: input.summary.trim(),
    description: input.description.trim(),
    icon: category.layout === "grid" ? input.icon : undefined,
  };

  await saveCatalog(catalog);
  return catalog.items[index];
}

export async function setItemActive(
  id: string,
  active: boolean
): Promise<CatalogItem | null> {
  const catalog = await readCatalog();
  const index = catalog.items.findIndex((i) => i.id === id);
  if (index === -1) return null;

  catalog.items[index] = { ...catalog.items[index], active };
  await saveCatalog(catalog);
  return catalog.items[index];
}

export async function deleteItem(id: string): Promise<boolean> {
  const catalog = await readCatalog();
  const filtered = catalog.items.filter((i) => i.id !== id);
  if (filtered.length === catalog.items.length) return false;

  catalog.items = filtered;
  await saveCatalog(catalog);

  try {
    await fs.rm(path.join(UPLOADS_DIR, id), { recursive: true, force: true });
  } catch {
    // pasta pode não existir
  }

  return true;
}

export async function addItemImage(
  id: string,
  file: { name: string; buffer: Buffer }
): Promise<CatalogItem | null> {
  const catalog = await readCatalog();
  const index = catalog.items.findIndex((i) => i.id === id);
  if (index === -1) return null;

  const item = catalog.items[index];
  if (item.images.length >= MAX_ITEM_IMAGES) {
    throw new Error(`Máximo de ${MAX_ITEM_IMAGES} imagens por produto`);
  }

  const ext = path.extname(file.name).toLowerCase() || ".jpg";
  const allowed = [".jpg", ".jpeg", ".png", ".webp"];
  if (!allowed.includes(ext)) {
    throw new Error("Formato inválido. Use JPG, PNG ou WebP.");
  }

  const itemDir = path.join(UPLOADS_DIR, id);
  await fs.mkdir(itemDir, { recursive: true });

  const filename = `${Date.now()}${ext}`;
  const diskPath = path.join(itemDir, filename);
  await fs.writeFile(diskPath, file.buffer);

  const publicPath = `/uploads/items/${id}/${filename}`;
  item.images.push(publicPath);

  await saveCatalog(catalog);
  return item;
}

export async function removeItemImage(
  id: string,
  imagePath: string
): Promise<CatalogItem | null> {
  const catalog = await readCatalog();
  const index = catalog.items.findIndex((i) => i.id === id);
  if (index === -1) return null;

  const item = catalog.items[index];
  if (!item.images.includes(imagePath)) {
    throw new Error("Imagem não encontrada");
  }

  item.images = item.images.filter((img) => img !== imagePath);
  await saveCatalog(catalog);

  if (imagePath.startsWith("/uploads/")) {
    const diskPath = path.join(process.cwd(), "public", imagePath);
    try {
      await fs.unlink(diskPath);
    } catch {
      // arquivo pode já ter sido removido
    }
  }

  return item;
}

export async function getItemById(id: string): Promise<CatalogItem | null> {
  const catalog = await readCatalog();
  return catalog.items.find((i) => i.id === id) ?? null;
}
