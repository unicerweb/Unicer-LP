import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { OurProducts } from "@/components/OurProducts";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getActiveProductCategories } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Nossos Produtos | Unicer",
  description:
    "Catálogo completo de peças de reposição e máquinas para a indústria cerâmica. Unicer — Leme, SP, desde 1986.",
  openGraph: {
    title: "Nossos Produtos | Unicer",
    description:
      "Peças de reposição e equipamentos para Bonfanti, Morando, Verdés e outras marcas.",
    locale: "pt_BR",
    type: "website",
  },
};

export default async function ProdutosPage() {
  const categories = await getActiveProductCategories();

  return (
    <>
      <Header />
      <main>
        <OurProducts categories={categories} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
