import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { BRANDS } from "@/lib/constants";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

const HIGHLIGHTS = [
  "Uma das maiores fabricantes de peças de reposição do setor",
  "Atendimento às principais marcas do mercado cerâmico",
  "Peças sob medida e em padronizações especiais",
  "Manufatura para terceiros com controle de qualidade",
];

export function About() {
  return (
    <section id="empresa" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <AnimateOnScroll variant="fade-right">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-unicer-red">
                A Empresa
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-unicer-blue sm:text-4xl lg:text-5xl">
                Tradição e excelência na indústria cerâmica
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-unicer-blue/70">
                Fundada em 1986 em Leme, SP, a Unicer nasceu da experiência de
                profissionais que atuaram em grandes empresas do setor industrial
                cerâmico. O que começou com peças de reposição simples evoluiu
                para uma das maiores e melhores fabricantes do país.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-unicer-blue/70">
                Hoje produzimos cilindros para laminadores, pinhões, eixos,
                engrenagens, bombas de vácuo, rodas de vagonetas e peças de
                reposição para equipamentos das marcas{" "}
                {BRANDS.join(", ")}.
              </p>

              <ul className="mt-8 space-y-3">
                {HIGHLIGHTS.map((item, index) => (
                  <AnimateOnScroll key={item} delay={index * 80} variant="fade-up">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-unicer-red" />
                      <span className="text-unicer-blue/80">{item}</span>
                    </li>
                  </AnimateOnScroll>
                ))}
              </ul>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fade-left" delay={120}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-unicer-red/10 to-unicer-blue/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border-2 border-unicer-blue/15 bg-white p-8 shadow-xl shadow-unicer-blue/10 sm:p-10">
                <div className="mb-8 overflow-hidden rounded-xl border border-unicer-blue/10">
                  <Image
                    src="/home.png"
                    alt="Unicer Equipamentos para Cerâmica"
                    width={1996}
                    height={1000}
                    className="h-auto w-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {BRANDS.map((brand, index) => (
                    <AnimateOnScroll key={brand} delay={index * 60} variant="scale-up">
                      <div className="rounded-xl border border-unicer-blue/10 bg-unicer-blue/5 px-3 py-4 text-center">
                        <span className="text-sm font-semibold text-unicer-blue">
                          {brand}
                        </span>
                      </div>
                    </AnimateOnScroll>
                  ))}
                </div>

                <p className="mt-6 text-center text-xs text-unicer-blue/50">
                  Peças de reposição para as principais marcas do setor
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
