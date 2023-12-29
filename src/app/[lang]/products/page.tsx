import { Locale } from "@/i18n-config";

export default function Product({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return <div className="text-4xl">Products: {lang}</div>;
}
