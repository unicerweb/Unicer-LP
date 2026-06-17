import { ArrowRight } from "lucide-react";
import { COMPANY, WHATSAPP_QUOTE_URL } from "@/lib/constants";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden py-16">
      <div className="absolute inset-0 bg-unicer-red-dark" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(26,19,99,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(26,19,99,0.15)_1px,transparent_1px)] bg-[size:3rem_3rem]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 text-center sm:px-6 lg:flex-row lg:text-left">
        <div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Precisa de peças ou equipamentos para sua cerâmica?
          </h2>
          <p className="mt-2 text-white/85">
            Fale com a {COMPANY.name} e receba atendimento especializado.
          </p>
        </div>
        <a
          href={WHATSAPP_QUOTE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-unicer-blue px-8 py-4 text-base font-semibold text-white shadow-xl transition-all hover:bg-unicer-blue-dark hover:scale-[1.02]"
        >
          Solicitar orçamento agora
          <ArrowRight className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
}
