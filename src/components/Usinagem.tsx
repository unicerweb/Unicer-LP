"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

const PARAGRAPHS = [
  "A UNICER iniciou as atividades de usinagem em 2017 para fornecimento próprio e, ao longo do processo de implantação e desenvolvimento, adquiriu tornos verticais e horizontais. A capacidade de usinagem de peças nos tornos verticais alcança medidas de até 1250 mm de diâmetro e nos tornos horizontais admitem-se medidas de até 4 metros de comprimento.",
  "A capacidade produtiva total da usinagem UNICER é de 6 toneladas por dia e nesta possibilitando atender serviços a terceiros.",
  "A usinagem UNICER possui os melhores e mais capacitados profissionais do mercado em seu quadro técnico-operacional, garantindo qualidade superior em seu ciclo de produção, desde a matéria-prima até a peça finalizada.",
];

interface UsinagemProps {
  images: string[];
}

export function Usinagem({ images }: UsinagemProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) {
    return (
      <section id="usinagem" className="relative bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <UsinagemContent />
          </AnimateOnScroll>
        </div>
      </section>
    );
  }

  const goTo = (index: number) => {
    setActiveIndex((index + images.length) % images.length);
  };

  return (
    <section id="usinagem" className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <AnimateOnScroll variant="fade-right">
            <UsinagemContent />
          </AnimateOnScroll>

          <AnimateOnScroll variant="fade-left" delay={120}>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-unicer-red/10 to-unicer-blue/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-unicer-blue/10 bg-muted shadow-xl shadow-unicer-blue/10">
              <div className="relative aspect-[4/3] overflow-hidden">
                <div
                  className="flex h-full transition-transform duration-700 ease-in-out will-change-transform"
                  style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                  {images.map((src, index) => (
                    <div key={src} className="relative h-full w-full min-w-full shrink-0">
                      <Image
                        src={src}
                        alt={`Usinagem UNICER — foto ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={index === 0}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => goTo(activeIndex - 1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-unicer-blue shadow-md transition-colors hover:bg-white"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(activeIndex + 1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-unicer-blue shadow-md transition-colors hover:bg-white"
                    aria-label="Próxima foto"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {images.map((src, index) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`h-2.5 rounded-full transition-all ${
                          index === activeIndex
                            ? "w-8 bg-unicer-red"
                            : "w-2.5 bg-white/70 hover:bg-white"
                        }`}
                        aria-label={`Ver foto ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

function UsinagemContent() {
  return (
    <div>
      <span className="text-sm font-semibold uppercase tracking-widest text-unicer-red">
        Usinagem
      </span>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-unicer-blue sm:text-4xl lg:text-5xl">
        Usinagem própria com capacidade industrial
      </h2>
      <div className="mt-6 space-y-5 text-lg leading-relaxed text-unicer-blue/70">
        {PARAGRAPHS.map((paragraph, index) => (
          <AnimateOnScroll key={paragraph.slice(0, 40)} delay={index * 80} variant="fade-up">
            <p>{paragraph}</p>
          </AnimateOnScroll>
        ))}
      </div>
    </div>
  );
}
