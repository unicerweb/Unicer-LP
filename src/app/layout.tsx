import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
// Força novo deploy para publicar Pixel Meta Unicer
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
verification: {
  other: {
    "facebook-domain-verification": "abtbfxsn1w55sbhozsoxraummrf4yi",
  },
},};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <html lang="pt-BR" className={`${dmSans.variable} h-full scroll-smooth`}>
        <body className="min-h-full bg-white antialiased"><Script id="meta-pixel-unicer" strategy="afterInteractive">
  {`
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1057442187036899');
    fbq('track', 'PageView');
  `}
</Script>
<noscript>
  <img
    height="1"
    width="1"
    style={{ display: "none" }}
    src="https://www.facebook.com/tr?id=1057442187036899&ev=PageView&noscript=1"
  />
</noscript>
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
          </Script>          <Script id="whatsapp-conversion-tracking" strategy="afterInteractive">
            {`
             function gtag_report_conversion(url) {
  var eventId = 'contact_' + Date.now() + '_' + Math.random().toString(36).substring(2);

  if (typeof fbq !== 'undefined') {
    fbq('track', 'Contact', {}, { eventID: eventId });
  }

  fetch('/api/meta-capi', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    keepalive: true,
    body: JSON.stringify({
      eventName: 'Contact',
      eventId: eventId,
      sourceUrl: window.location.href
    })
  }).catch(function(error) {
    console.error('Erro Meta CAPI:', error);
  });

  var callback = function () {
    if (typeof(url) != 'undefined') {
      window.location = url;
    }
  };

  gtag('event', 'conversion', {
    'send_to': 'AW-18303231984/6enKCM-qyMsCEPDPJdE',
    'value': 1.0,
    'currency': 'BRL',
    'event_callback': callback
  });

  return false;
}

              document.addEventListener('click', function(event) {
                var link = event.target.closest('a');

                if (!link) return;

                var href = link.getAttribute('href');

                if (
                  href &&
                  (
                    href.includes('wa.me') ||
                    href.includes('api.whatsapp.com') ||
                    href.includes('web.whatsapp.com') ||
                    href.includes('whatsapp')
                  )
                ) {
                  event.preventDefault();
                  gtag_report_conversion(href);
                }
              });
            `}
          </Script>
          {children}
        </body>
      </html>
  );
}
