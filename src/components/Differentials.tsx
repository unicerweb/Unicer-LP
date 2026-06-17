import { DIFFERENTIALS } from "@/lib/constants";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

export function Differentials() {
  return (
    <section id="diferenciais" className="relative bg-unicer-blue py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(144,21,21,0.08),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-unicer-red">
            Diferenciais
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Por que escolher a Unicer?
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Mais de quatro décadas de experiência, usinagem própria e
            compromisso com a qualidade que sua indústria exige.
          </p>
        </AnimateOnScroll>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {DIFFERENTIALS.map((item, index) => (
            <AnimateOnScroll key={item.title} delay={index * 100} variant="fade-up">
              <article className="h-full rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-colors duration-300 hover:border-white/20 hover:bg-white/10">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-white/70">
                  {item.description}
                </p>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
