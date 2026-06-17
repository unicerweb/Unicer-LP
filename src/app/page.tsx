import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ProductsPreview } from "@/components/ProductsPreview";
import { Usinagem } from "@/components/Usinagem";
import { Differentials } from "@/components/Differentials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getActiveProductCategories } from "@/lib/catalog";
import { discoverUsinagemImages } from "@/lib/usinagem-images";

export default async function Home() {
  const [categories, usinagemImages] = await Promise.all([
    getActiveProductCategories(),
    discoverUsinagemImages(),
  ]);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Usinagem images={usinagemImages} />
        <Differentials />
        <ProductsPreview categories={categories} />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
