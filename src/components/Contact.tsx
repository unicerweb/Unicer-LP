import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { COMPANY, MAPS_DIRECTIONS_URL, MAPS_EMBED_URL } from "@/lib/constants";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

export function Contact() {
  return (
    <section id="contato" className="relative bg-muted py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          <AnimateOnScroll variant="fade-right">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-unicer-red">
                Contato
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-unicer-blue sm:text-4xl">
                Solicite seu orçamento
              </h2>
              <p className="mt-4 text-lg text-unicer-blue/70">
                Fale com nossa equipe por telefone, e-mail ou WhatsApp. Atendemos
                cerâmicas em todo o Brasil e América do Sul.
              </p>

              <div className="mt-10 space-y-6">
                {[
                  {
                    icon: MapPin,
                    title: "Endereço",
                    content: (
                      <p className="mt-1 text-sm text-unicer-blue/65">
                        {COMPANY.address.street}
                        <br />
                        {COMPANY.address.neighborhood} — {COMPANY.address.city}/
                        {COMPANY.address.state}
                        <br />
                        CEP {COMPANY.address.cep}
                      </p>
                    ),
                  },
                  {
                    icon: Mail,
                    title: "E-mail",
                    content: (
                      <a
                        href={`mailto:${COMPANY.email}`}
                        className="mt-1 block text-sm text-unicer-blue/65 transition-colors hover:text-unicer-red"
                      >
                        {COMPANY.email}
                      </a>
                    ),
                  },
                  {
                    icon: MessageCircle,
                    title: "Televendas / WhatsApp",
                    content: (
                      <>
                        <a
                          href={`tel:+${COMPANY.whatsapp}`}
                          className="mt-1 block text-sm text-unicer-blue/65 transition-colors hover:text-unicer-red"
                        >
                          {COMPANY.televendas}
                        </a>
                        <a
                          href={`https://wa.me/${COMPANY.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 block text-sm text-unicer-blue/65 transition-colors hover:text-unicer-red"
                        >
                          Chamar no WhatsApp
                        </a>
                      </>
                    ),
                  },
                  {
                    icon: Phone,
                    title: "Localização",
                    content: (
                      <p className="mt-1 text-sm text-unicer-blue/65">
                        {COMPANY.address.landmark}
                      </p>
                    ),
                  },
                ].map((item, index) => (
                  <AnimateOnScroll key={item.title} delay={index * 70} variant="fade-up">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-unicer-red/10">
                        <item.icon className="h-5 w-5 text-unicer-red" />
                      </div>
                      <div>
                        <p className="font-medium text-unicer-blue">{item.title}</p>
                        {item.content}
                      </div>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fade-left" delay={120}>
            <div>
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-unicer-blue">
                    Como chegar
                  </h3>
                  <p className="mt-2 text-sm text-unicer-blue/65">
                    {COMPANY.address.street}, {COMPANY.address.neighborhood},{" "}
                    {COMPANY.address.city}/{COMPANY.address.state}
                  </p>
                </div>
                <a
                  href={MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-unicer-blue/15 bg-white px-5 py-2.5 text-sm font-semibold text-unicer-blue transition-colors hover:border-unicer-red/30 hover:text-unicer-red"
                >
                  <MapPin className="h-4 w-4" />
                  Traçar rota
                </a>
              </div>

              <div className="mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-unicer-blue/10 bg-white shadow-xl shadow-unicer-blue/5 sm:max-w-md">
                <iframe
                  title="Mapa de localização da Unicer em Leme, SP"
                  src={MAPS_EMBED_URL}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
