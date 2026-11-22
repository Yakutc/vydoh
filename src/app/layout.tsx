import type { Metadata, Viewport } from "next";
import "@struq/icons/tokens.css";
import "@struq/icons/icons.css";
import "@struq/icons/states.css";
import "./globals.css";
import { display, displayItalic, body } from "./fonts";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { Grain } from "@/components/ui/grain";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  // Origin only: Next adds basePath (/vydoh on GitHub Pages) to the OG/icon
  // paths itself; the canonical stays absolute in the page metadata.
  metadataBase: new URL(new URL(SITE_URL).origin),
  title: {
    default: "ВЫДОХ — бросить курить и парить без силы воли",
    template: "%s — ВЫДОХ",
  },
  description:
    "ВЫДОХ — система на 21 день для тех, кто бросает сигареты, вейпы и электронки. Держит в ту минуту, когда тянет, и показывает, сколько денег и дней возвращается.",
  openGraph: {
    type: "website",
    siteName: "ВЫДОХ",
    locale: "ru_RU",
    url: SITE_URL,
    title: "ВЫДОХ — бросить курить и парить без силы воли",
    description:
      "Система на 21 день: сигареты, вейпы, электронки. Пережди пик, посчитай деньги, верни воздух.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ВЫДОХ — бросить курить и парить без силы воли",
    description:
      "Система на 21 день: сигареты, вейпы, электронки. Пережди пик, посчитай деньги, верни воздух.",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf6ef",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${display.variable} ${displayItalic.variable} ${body.variable}`}
    >
      <body className="min-h-svh bg-surface-0 font-body text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-ink focus:px-4 focus:py-3 focus:font-ui focus:text-ui focus:text-surface-0"
        >
          К содержанию
        </a>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <Grain />
      </body>
    </html>
  );
}
