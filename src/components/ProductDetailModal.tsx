"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { CatalogItem } from "@/types/catalog";
import { COMPANY } from "@/lib/constants";

interface ProductDetailModalProps {
  item: CatalogItem | null;
  onClose: () => void;
}

export function ProductDetailModal({ item, onClose }: ProductDetailModalProps) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!item) return;

    setActiveImage(0);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && item.images.length > 1) {
        setActiveImage((i) => (i === 0 ? item.images.length - 1 : i - 1));
      }
      if (e.key === "ArrowRight" && item.images.length > 1) {
        setActiveImage((i) => (i === item.images.length - 1 ? 0 : i + 1));
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [item, onClose]);

  if (!item) return null;

  const quoteUrl = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
    `Olá! Gostaria de solicitar orçamento para: ${item.title}`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-title"
    >
      <button
        type="button"
        className="modal-backdrop-enter absolute inset-0 bg-unicer-blue/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Fechar"
      />

      <div className="modal-panel-enter relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
        <div className="flex items-center justify-between border-b border-unicer-blue/10 px-5 py-4">
          <h3 id="product-detail-title" className="pr-4 text-lg font-semibold text-unicer-blue">
            {item.title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-unicer-blue/60 hover:bg-unicer-blue/5 hover:text-unicer-blue"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto">
          {item.images.length > 0 && (
            <div className="border-b border-unicer-blue/10 bg-muted/30 p-4">
              <div className="relative mx-auto aspect-[4/3] max-w-xl overflow-hidden rounded-xl bg-muted">
                <Image
                  src={item.images[activeImage]}
                  alt={`${item.title} — foto ${activeImage + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 600px"
                  priority
                />
                {item.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImage((i) =>
                          i === 0 ? item.images.length - 1 : i - 1
                        )
                      }
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md text-unicer-blue hover:bg-white"
                      aria-label="Foto anterior"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImage((i) =>
                          i === item.images.length - 1 ? 0 : i + 1
                        )
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md text-unicer-blue hover:bg-white"
                      aria-label="Próxima foto"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              {item.images.length > 1 && (
                <div className="mt-3 flex justify-center gap-2">
                  {item.images.map((src, index) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      className={`relative h-14 w-14 overflow-hidden rounded-lg border-2 transition-colors ${
                        index === activeImage
                          ? "border-unicer-red"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                      aria-label={`Ver foto ${index + 1}`}
                    >
                      <Image src={src} alt="" fill className="object-cover" sizes="56px" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="space-y-4 p-5 sm:p-6">
            {item.summary && item.summary !== item.description && (
              <p className="text-base font-medium text-unicer-blue/80">{item.summary}</p>
            )}
            <div className="prose prose-sm max-w-none text-unicer-blue/70">
              {item.description.split("\n").map((paragraph, i) =>
                paragraph.trim() ? (
                  <p key={i} className="leading-relaxed">
                    {paragraph}
                  </p>
                ) : null
              )}
            </div>

            <a
              href={quoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full bg-unicer-red-dark px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-unicer-red-darker sm:w-auto"
            >
              Solicitar orçamento deste produto
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
