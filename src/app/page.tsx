import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Manifesto } from "@/components/site/manifesto";
import { Moment } from "@/components/site/moment";
import { Hours72 } from "@/components/site/hours-72";
import { Calculator } from "@/components/site/calculator";
import { Pricing } from "@/components/site/pricing";
import { SiteFooter } from "@/components/site/site-footer";
import { CITY, CONTACT_EMAIL, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "ВЫДОХ",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      email: CONTACT_EMAIL,
      address: {
        "@type": "PostalAddress",
        addressLocality: CITY,
        addressCountry: "RU",
      },
      description:
        "Система на 21 день, которая помогает бросить курить, парить и отказаться от электронных сигарет.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "ВЫДОХ",
      url: SITE_URL,
      inLanguage: "ru",
      description:
        "Пережди пик тяги, посчитай свои деньги, верни воздух. ВЫДОХ — система на 21 день для сигарет, вейпов и электронок.",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <Header />

      <main id="main">
        <Hero />
        <Manifesto />
        <Moment />
        <Hours72 />
        <Calculator />
        <Pricing />
      </main>

      <SiteFooter />
    </>
  );
}
