import "server-only";
import { i18n } from "@/i18n.config";
import { cookies } from "next/headers";

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  fr: () => import("@/dictionaries/fr.json").then((module) => module.default),
};

function lang() {
  const langCookie = cookies().get("lang");
  if (langCookie) {
    for (let i = 0; i < i18n.locales.length; i++) if (langCookie.value === i18n.locales[i]) return i18n.locales[i];
    return i18n.defaultLocale;
  } else return i18n.defaultLocale;
}
export const getDictionary = async () => dictionaries[lang()]();
