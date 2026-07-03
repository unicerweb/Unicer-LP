export const COMPANY = {
  name: "Unicer",
  fullName: "Unicer Equipamentos para Cerâmica",
  tagline: "Peças, máquinas e equipamentos para a indústria cerâmica",
  founded: 1986,
  phone: "(19) 3572-9292",
  televendas: "+55 19 3572-9292",
  email: "vendas@unicer.com.br",
  whatsapp: "551935729292",
  address: {
    street: "Rua Luís Moraes Rêgo, 213",
    neighborhood: "Jardim do Bosque",
    city: "Leme",
    state: "SP",
    cep: "13613-100",
    landmark: "Km 190 da Rodovia Anhanguera",
    full: "Rua Luís Moraes Rêgo, 213, Jardim do Bosque, Leme, SP, 13613-100",
  },
} as const;

export const SITE_LOGO = "/logo.png";

const MAPS_QUERY = encodeURIComponent(
  `${COMPANY.address.full}, Brasil`
);

export const MAPS_EMBED_URL = `https://maps.google.com/maps?q=${MAPS_QUERY}&hl=pt-BR&z=16&output=embed`;

export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`;

export const WHATSAPP_QUOTE_MESSAGE =
  "Olá! Vim pelo site e gostaria de solicitar um orçamento.";

export const WHATSAPP_QUOTE_URL = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(WHATSAPP_QUOTE_MESSAGE)}`;

export const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Empresa", href: "/#empresa" },
  { label: "Usinagem", href: "/#usinagem" },
  { label: "Diferenciais", href: "/#diferenciais" },
  { label: "Nossos Produtos", href: "/produtos" },
  { label: "Contato", href: "/#contato" },
] as const;

export const STATS = [
  { value: "1986", label: "Ano de fundação" },
  { value: "40+", label: "Anos de experiência" },
  { value: "BR + LATAM", label: "Área de atuação" },
  { value: "100%", label: "Usinagem própria" },
] as const;

export const PRODUCTS = [
  {
    title: "Cilindros para laminadores",
    description: "Cilindros cônicos e chavetados com alta precisão dimensional.",
    icon: "cylinder" as const,
  },
  {
    title: "Engrenagens e pinhões",
    description: "Peças de transmissão para toda linha de equipamentos cerâmicos.",
    icon: "gear" as const,
  },
  {
    title: "Eixos e eixos-pinhão",
    description: "Componentes usinados sob medida com controle rigoroso de qualidade.",
    icon: "axis" as const,
  },
  {
    title: "Rodas de vagonetas",
    description: "Rodas e componentes para transporte interno em cerâmicas.",
    icon: "wheel" as const,
  },
  {
    title: "Peças sob medida",
    description: "Fabricação em padronizações especiais conforme sua necessidade.",
    icon: "custom" as const,
  },
  {
    title: "Reposição multimarca",
    description: "Peças regulares para Bonfanti, Morando, Verdés e outras marcas.",
    icon: "brands" as const,
  },
] as const;

export const MACHINES = [
  {
    title: "Bombas de vácuo",
    description: "Modelos à água e à óleo para processos industriais cerâmicos.",
  },
  {
    title: "Desintegrador Unicer 600",
    description: "Equipamento robusto para preparação e homogeneização de massa.",
  },
  {
    title: "Laminador Unicer 600",
    description: "Laminador de alta performance para linhas de produção.",
  },
  {
    title: "Marombas reformadas",
    description: "Bonfanti MVB-14/110 e Morando MVP-4 totalmente revisadas.",
  },
  {
    title: "Torre de resfriamento",
    description: "Solução eficiente para controle térmico em processos industriais.",
  },
] as const;

export const DIFFERENTIALS = [
  {
    title: "Usinagem própria",
    description:
      "Controle total de qualidade na fabricação, com capacidade de manufatura para terceiros.",
  },
  {
    title: "Especialistas no setor",
    description:
      "Equipe com ampla experiência em grandes empresas do setor industrial cerâmico.",
  },
  {
    title: "Logística estratégica",
    description:
      "Localização privilegiada na Anhanguera para atender todo o Brasil e América do Sul.",
  },
  {
    title: "Ampla variedade",
    description:
      "Centenas de peças de reposição, máquinas e equipamentos em um só fornecedor.",
  },
] as const;
