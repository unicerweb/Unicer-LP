"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Cog,
  CircleDot,
  Minus,
  Disc3,
  Wrench,
  Layers,
  Factory,
  Images,
  type LucideIcon,
} from "lucide-react";
import type { CatalogItem, CategoryWithItems, ItemIcon } from "@/types/catalog";
import { isProductImageCategory } from "@/types/catalog";
import { WHATSAPP_QUOTE_URL } from "@/lib/constants";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

const ICONS: Record<ItemIcon, LucideIcon> = {
  cylinder: Minus,
  gear: Cog,
  axis: CircleDot,
  wheel: Disc3,
  custom: Wrench,
  brands: Layers,
};

interface OurProductsProps {
  categories: CategoryWithItems[];
}

export function OurProducts({ categories }: OurProductsProps) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");
  const [detailItem, setDetailItem] = useState<CatalogItem | null>(null);

  if (categories.length === 0) return null;

  const activeCategory =
    categories.find((c) => c.id === activeId) ?? categories[0];
  const showProductImages = isProductImageCategory(activeCategory);

  return (
    <section className="relative bg-muted pt-28 pb-24 sm:pt-36 sm:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-unicer-red">
            Catálogo
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-unicer-blue sm:text-4xl lg:text-5xl">
            Nossos Produtos
          </h2>
          <p className="mt-4 text-lg text-unicer-blue/70">
            Peças de reposição e máquinas para a indústria cerâmica. Tudo em um
            só lugar.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={80} className="mt-12 flex justify-center">
          <div className="inline-flex w-full max-w-lg flex-col gap-2 rounded-2xl border border-unicer-blue/10 bg-white p-1.5 shadow-sm sm:max-w-none sm:flex-row sm:rounded-full">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveId(category.id)}
                className={`flex-1 rounded-xl px-5 py-3 text-sm font-semibold transition-all sm:rounded-full sm:px-8 ${
                  activeCategory.id === category.id
                    ? "bg-unicer-blue text-white shadow-md"
                    : "text-unicer-blue/70 hover:bg-unicer-blue/5 hover:text-unicer-blue"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={120} className="mx-auto mt-8 max-w-3xl text-center">
          <h3 className="text-xl font-semibold text-unicer-blue">
            {activeCategory.title}
          </h3>
          <p className="mt-2 text-unicer-blue/65">{activeCategory.description}</p>
          {showProductImages && (
            <p className="mt-2 text-sm text-unicer-blue/50">
              Clique em um produto para ver fotos e descrição completa.
            </p>
          )}
        </AnimateOnScroll>

        {activeCategory.items.length === 0 ? (
          <p className="mt-16 text-center text-unicer-blue/50">
            Nenhum produto disponível nesta categoria no momento.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activeCategory.items.map((item, index) => {
              const Icon = item.icon ? ICONS[item.icon] : Factory;
              const hasDetail =
                showProductImages &&
                (item.images.length > 0 || item.description);
              const previewImage = item.images[0];

              const cardContent = (
                <>
                  {previewImage ? (
                    <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                      <Image
                        src={previewImage}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      {item.images.length > 1 && (
                        <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-black/55 px-2 py-1 text-xs font-medium text-white">
                          <Images className="h-3.5 w-3.5" />
                          {item.images.length}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-unicer-red/10 text-unicer-red transition-colors group-hover:bg-unicer-red/15">
                      <Icon className="h-6 w-6" />
                    </div>
                  )}
                  <h4 className="text-lg font-semibold text-unicer-blue">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-unicer-blue/65 line-clamp-3">
                    {item.summary}
                  </p>
                  {hasDetail && (
                    <span className="mt-4 inline-block text-sm font-medium text-unicer-red group-hover:underline">
                      Ver detalhes
                    </span>
                  )}
                </>
              );

              if (hasDetail) {
                return (
                  <AnimateOnScroll
                    key={`${activeCategory.id}-${item.id}`}
                    variant="fade-up"
                    delay={(index % 6) * 60}
                  >
                    <button
                      type="button"
                      onClick={() => setDetailItem(item)}
                      className="group w-full rounded-2xl border border-unicer-blue/10 bg-white p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-unicer-red/30 hover:shadow-lg hover:shadow-unicer-blue/5"
                    >
                      {cardContent}
                    </button>
                  </AnimateOnScroll>
                );
              }

              return (
                <AnimateOnScroll
                  key={`${activeCategory.id}-${item.id}`}
                  variant="fade-up"
                  delay={(index % 6) * 60}
                >
                  <article className="group h-full rounded-2xl border border-unicer-blue/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-unicer-red/30 hover:shadow-lg hover:shadow-unicer-blue/5">
                    {cardContent}
                  </article>
                </AnimateOnScroll>
              );
            })}
          </div>
        )}

        <AnimateOnScroll delay={100} className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={WHATSAPP_QUOTE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-unicer-red-dark px-8 py-4 text-base font-semibold text-white shadow-lg shadow-unicer-red-dark/25 transition-all hover:bg-unicer-red-darker hover:scale-[1.02]"
          >
            Solicitar orçamento
          </a>
          <p className="text-sm text-unicer-blue/50">
            Não encontrou o que precisa? Fale conosco pelo WhatsApp.
          </p>
        </AnimateOnScroll>
      </div>

      <ProductDetailModal item={detailItem} onClose={() => setDetailItem(null)} />
    </section>
  );
}
