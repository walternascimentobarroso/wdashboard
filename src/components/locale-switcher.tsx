"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n } from "@/i18n-config";

export default function LocaleSwitcher({
  dictionary,
}: {
  dictionary: {
    increment: string;
    decrement: string;
  };
}) {
  const pathName = usePathname();
  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div className="flex flex-col items-center justify-center container border">
      <p className="text-lg font-bold">Mudar Idioma</p>
      <ul className="flex gap-4">
        {i18n.locales.map((locale) => {
          return (
            <li
              key={locale}
              className="bg-cyan-500 m-4 p-4 rounded-md font-bold"
            >
              <Link href={redirectedPathName(locale)}>{locale}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
