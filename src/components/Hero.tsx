import { ArrowRight, MapPin, Shield } from "lucide-react";
import { COMPANY, WHATSAPP_QUOTE_URL } from "@/lib/constants";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen overflow-hidden bg-[#1a1363] pt-24"
    >
      <div className="absolute inset-0 bg-[#1a1363]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_0%,#1e3a8a_0%,transparent_60%)] opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_0%_100%,#0f0d3d_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="hero-reveal mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
          <Shield className="hero-accent h-4 w-4" strokeWidth={2.5} />
          Desde {COMPANY.founded} · Leme, SP
        </div>

        <h1 className="hero-reveal hero-reveal-d1 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
          Peças e equipamentos para{" "}
          <span className="hero-accent">indústria cerâmica</span>
        </h1>

        <p className="hero-reveal hero-reveal-d2 mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
          {COMPANY.fullName} é referência na fabricação de peças de reposição,
          máquinas e equipamentos. Atendemos cerâmicas em todo o Brasil e
          América do Sul com usinagem própria e qualidade comprovada.
        </p>

        <div className="hero-reveal hero-reveal-d3 mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href={WHATSAPP_QUOTE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white transition-all hover:scale-[1.02]"
          >
            Solicitar orçamento
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="/produtos"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 px-8 py-4 text-base font-semibold text-white transition-all hover:border-white hover:bg-white/10"
          >
            Ver nossos produtos
          </a>
        </div>

        <div className="hero-reveal hero-reveal-d4 mt-12 flex items-center gap-2 text-sm text-white/60">
          <MapPin className="hero-accent h-4 w-4 shrink-0" strokeWidth={2.5} />
          {COMPANY.address.landmark} · {COMPANY.address.city}/{COMPANY.address.state}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-bounce lg:block">
        <div className="h-10 w-6 rounded-full border-2 border-white/35 p-1">
          <div className="hero-dot h-2 w-full rounded-full" />
        </div>
      </div>
    </section>
  );
}
