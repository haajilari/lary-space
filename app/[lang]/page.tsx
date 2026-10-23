import Portfolio from "@/components/Portfolio";
import { isLocale } from "@/content/site";
import { notFound } from "next/navigation";

export default async function LocaleHome({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <Portfolio locale={lang} />;
}
