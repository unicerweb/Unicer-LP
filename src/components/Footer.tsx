import Image from "next/image";
import { COMPANY, NAV_LINKS, SITE_LOGO } from "@/lib/constants";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-unicer-blue">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <AnimateOnScroll variant="fade-up">
            <div>
              <Image
                src={SITE_LOGO}
                alt={COMPANY.fullName}
                width={200}
                height={68}
                className="h-12 w-auto rounded-lg bg-white/95 p-1"
              />
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                {COMPANY.tagline}. Atuando desde {COMPANY.founded} em Leme, SP.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fade-up" delay={80}>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50">
                Navegação
              </h4>
              <nav className="mt-4 flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-unicer-red"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fade-up" delay={160}>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50">
                Contato
              </h4>
              <div className="mt-4 space-y-2 text-sm text-white/60">
                <p>{COMPANY.address.street}</p>
                <p>
                  {COMPANY.address.neighborhood} — {COMPANY.address.city}/
                  {COMPANY.address.state}
                </p>
                <p>CEP {COMPANY.address.cep}</p>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="block transition-colors hover:text-unicer-red"
                >
                  {COMPANY.email}
                </a>
                <a
                  href={`https://wa.me/${COMPANY.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-colors hover:text-unicer-red"
                >
                  Televendas/WhatsApp: {COMPANY.televendas}
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        <AnimateOnScroll variant="fade-in" delay={200}>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
            <p className="text-xs text-white/40">
              © {year} {COMPANY.fullName}. Todos os direitos reservados.
            </p>
            <p className="text-xs text-white/40">
              {COMPANY.address.landmark}
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </footer>
  );
}
