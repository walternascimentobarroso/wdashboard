import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/i18n-config";
import Counter from "@/components/counter";
import LocaleSwitcher from "@/components/locale-switcher";

export default async function IndexPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <div>
      <LocaleSwitcher dictionary={dictionary.counter} />
      <p className="text-2xl font-bold m-4 p-4">
        {dictionary["current-locale"]}: {lang}
      </p>
      <p className="font-bold m-4 p-4 border rounded-md bg-slate-300">
        Server Component: {dictionary["server-component"].welcome}
      </p>
      <Counter dictionary={dictionary.counter} />
    </div>
  );
}
