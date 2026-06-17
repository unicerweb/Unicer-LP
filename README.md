# Unicer — Landing Page Institucional

Site institucional moderno da **Unicer Equipamentos para Cerâmica**, otimizado para campanhas de tráfego pago (Google Ads).

## Tecnologias

- [Next.js](https://nextjs.org/) 16 (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Lucide React](https://lucide.dev/) (ícones)

## Desenvolvimento

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Build de produção

```bash
npm run build
npm start
```

## Estrutura

- `src/app/` — layout, página principal e estilos globais
- `src/components/` — seções da landing page
- `src/lib/constants.ts` — dados da empresa (telefone, endereço, produtos)

## Google Ads

O site foi pensado para conversão:

- CTAs claros ("Solicitar orçamento")
- Botão flutuante de WhatsApp
- Formulário de contato que redireciona ao WhatsApp
- SEO configurado com metadata e Open Graph
- Layout responsivo e carregamento rápido

Para integrar o Google Tag Manager ou Google Analytics, adicione os scripts no `src/app/layout.tsx`.
