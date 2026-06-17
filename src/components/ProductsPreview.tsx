"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { CategoryWithItems } from "@/types/catalog";
import { isPecasCategory } from "@/types/catalog";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

interface ProductsPreviewProps {
  categories: CategoryWithItems[];
}

export function ProductsPreview({ categories }: ProductsPreviewProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (categories.length === 0) return null;

  const pecas = categories.find((c) => isPecasCategory(c));
  const previewItems = pecas?.items ?? [];
  const totalItems = categories.reduce((sum, c) => sum + c.items.length, 0);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const card = el.querySelector<HTMLElement>("[data-product-card]");
    const gap = 24;
    const amount = (card?.offsetWidth ?? 300) + gap;

    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="produtos" className="relative bg-muted py-24 sm:py-32">
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

        {previewItems.length > 0 && (
          <AnimateOnScroll delay={100} className="relative mt-12">
            {previewItems.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => scroll("left")}
                  className="absolute -left-2 top-[calc(50%-2rem)] z-10 hidden -translate-y-1/2 rounded-full border border-unicer-blue/10 bg-white p-2.5 text-unicer-blue shadow-lg transition-colors hover:text-unicer-red sm:flex lg:-left-5"
                  aria-label="Produtos anteriores"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scroll("right")}
                  className="absolute -right-2 top-[calc(50%-2rem)] z-10 hidden -translate-y-1/2 rounded-full border border-unicer-blue/10 bg-white p-2.5 text-unicer-blue shadow-lg transition-colors hover:text-unicer-red sm:flex lg:-right-5"
                  aria-label="Próximos produtos"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] scrollbar-none snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
            >
              {previewItems.map((item, index) => {
                const previewImage = item.images[0];

                return (
                  <AnimateOnScroll
                    key={item.id}
                    variant="fade-up"
                    delay={index * 50}
                    className="w-72 shrink-0 snap-start sm:w-80"
                  >
                    <article
                      data-product-card
                      className="overflow-hidden rounded-2xl border border-unicer-blue/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    >
                      {previewImage ? (
                        <div className="relative aspect-4/3 bg-muted">
                          <Image
                            src={previewImage}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="320px"
                          />
                        </div>
                      ) : (
                        <div className="flex aspect-4/3 items-center justify-center bg-unicer-blue/5 px-6 text-center text-sm text-unicer-blue/50">
                          Sem imagem
                        </div>
                      )}
                      <div className="p-5">
                        <h4 className="font-semibold text-unicer-blue">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-sm text-unicer-blue/65 line-clamp-2">
                          {item.summary}
                        </p>
                      </div>
                    </article>
                  </AnimateOnScroll>
                );
              })}
            </div>

            <p className="mt-4 text-center text-sm text-unicer-blue/45 sm:hidden">
              Deslize para ver mais produtos
            </p>
          </AnimateOnScroll>
        )}

        <AnimateOnScroll delay={150} className="mt-14 flex flex-col items-center gap-3 text-center">
          <Link
            href="/produtos"
            className="group inline-flex items-center gap-2 rounded-full bg-unicer-blue px-8 py-4 text-base font-semibold text-white shadow-lg shadow-unicer-blue/20 transition-all hover:bg-unicer-blue/90 hover:scale-[1.02]"
          >
            Ver todos os produtos
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          {totalItems > previewItems.length && (
            <p className="text-sm text-unicer-blue/50">
              +{totalItems - previewItems.length} itens no catálogo completo
            </p>
          )}
        </AnimateOnScroll>
      </div>
    </section>
  );
}
