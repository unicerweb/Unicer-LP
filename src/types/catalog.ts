export const ITEM_ICONS = [
  "cylinder",
  "gear",
  "axis",
  "wheel",
  "custom",
  "brands",
] as const;

export type ItemIcon = (typeof ITEM_ICONS)[number];

export type CategoryLayout = "grid" | "list";

export const MAX_ITEM_IMAGES = 4;

export interface Category {
  id: string;
  slug: string;
  label: string;
  title: string;
  description: string;
  layout: CategoryLayout;
  highlightTitle?: string;
  highlightDescription?: string;
  active: boolean;
  order: number;
}

export interface CatalogItem {
  id: string;
  categoryId: string;
  title: string;
  summary: string;
  description: string;
  icon?: ItemIcon;
  images: string[];
  active: boolean;
  order: number;
}

export interface Catalog {
  categories: Category[];
  items: CatalogItem[];
}

export interface CategoryInput {
  slug: string;
  label: string;
  title: string;
  description: string;
  layout: CategoryLayout;
  highlightTitle?: string;
  highlightDescription?: string;
}

export interface ItemInput {
  categoryId: string;
  title: string;
  summary: string;
  description: string;
  icon?: ItemIcon;
}

export interface CategoryWithItems extends Category {
  items: CatalogItem[];
}

export function isPecasCategory(category: Pick<Category, "slug">): boolean {
  return category.slug === "pecas";
}

export function isMaquinasCategory(category: Pick<Category, "slug">): boolean {
  return category.slug === "maquinas";
}

export function isProductImageCategory(category: Pick<Category, "slug">): boolean {
  return isPecasCategory(category) || isMaquinasCategory(category);
}
