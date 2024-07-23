"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Check, ChevronDown } from "lucide-react";

const setCookie = (name: string, value: string) => {
  document.cookie = `${name}=${value}; path=/`;
};

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() ?? null;
  return null;
};

export default function LanguageToggle() {
  const router = useRouter();
  const langCookie = getCookie("lang");
  const lang = langCookie !== null ? langCookie : "en";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {lang === "en" ? "English" : "Francais"}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className=" p-0">
          <Button
            variant="ghost"
            className="w-full h-full flex justify-start items-center gap-2"
            onClick={() => {
              setCookie("lang", "en");
              router.refresh();
            }}
          >
            English
            <Check className={`h-4 w-4 ${lang === "en" ? "" : "hidden"} `} />
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuLabel className="p-0">
          <Button
            variant="ghost"
            className="w-full h-full flex justify-start items-center gap-2"
            onClick={() => {
              setCookie("lang", "fr");
              router.refresh();
            }}
          >
            Francais
            <Check className={`h-4 w-4 ${lang === "fr" ? "" : "hidden"} `} />
          </Button>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
