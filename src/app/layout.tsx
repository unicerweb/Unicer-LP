import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Unicer | Peças e Equipamentos para Indústria Cerâmica",
  description:
    "Unicer Equipamentos para Cerâmica — desde 1986 em Leme, SP. Peças de reposição, máquinas e equipamentos para Bonfanti, Morando e Verdés. Atendimento em todo Brasil e América do Sul.",
  keywords: [
    "peças cerâmica",
    "equipamentos cerâmica",
    "Unicer",
    "peças reposição cerâmica",
    "laminador cerâmica",
    "bombas vácuo cerâmica",
    "Bonfanti",
    "Morando",
    "Verdés",
    "Leme SP",
  ],
  authors: [{ name: "Unicer Equipamentos para Cerâmica" }],
  openGraph: {
    title: "Unicer | Peças e Equipamentos para Indústria Cerâmica",
    description:
      "Referência em peças de reposição, máquinas e equipamentos para a indústria cerâmica desde 1986.",
    locale: "pt_BR",
    type: "website",
    url: "https://www.unicer.com.br",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <html lang="pt-BR" className={`${dmSans.variable} h-full scroll-smooth`}>
        <body className="min-h-full bg-white antialiased">
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=AW-18303231984"
            strategy="afterInteractive"
          />
          <Script id="google-ads-tag" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'AW-18303231984');
            `}
          </Script>
          {children}
        </body>
      </html>
  );
}
