import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import "../globals.css";
import { isLocale } from "@/content/site";
import { vazirmatn } from "@/app/fonts";

type LangParams = { params: Promise<{ lang: string }> };
type Props = { children: ReactNode } & LangParams;

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fa" }];
}

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const isFa = lang === "fa";
  const title = "LarySpace — Amirhossein Hajilari";
  const description = isFa
    ? "فضایی برای ساختن، تجربه کردن و شکفتن. نمونه‌کارها، مسیر حرفه‌ای و موسیقی امیرحسین حاجی‌لری، مهندس نرم‌افزار."
    : "A space to become. Explore the work, ideas, and sounds of Amirhossein Hajilari — Software Engineer.";
  return {
    metadataBase: new URL("https://laryspace.tech"),
    title,
    description,
    alternates: {
      canonical: `/${lang}`,
      languages: { "en-US": "/en", "fa-IR": "/fa", "x-default": "/en" },
    },
    openGraph: {
      title,
      description,
      siteName: "LarySpace",
      type: "website",
      locale: isFa ? "fa_IR" : "en_US",
      alternateLocale: isFa ? ["en_US"] : ["fa_IR"],
      images: [{ url: "/branding/og-cover.jpg", width: 1200, height: 630, alt: "LarySpace personal identity" }],
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html lang={lang} dir={lang === "fa" ? "rtl" : "ltr"}>
      <body className={vazirmatn.variable}>{children}</body>
    </html>
  );
}
