"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Check, ChevronDown } from "lucide-react";

function searchParamsFormat(searchParamsArray: [string, string][]) {
  if (searchParamsArray.length === 0) return "";
  let searchParamsFormat = "?";
  searchParamsArray.forEach((searchParam) => {
    searchParamsFormat = searchParamsFormat.concat(
      searchParam[0] + "=" + encodeURIComponent(searchParam[1]) + "&"
    );
  });
  searchParamsFormat = searchParamsFormat.slice(0, -1);
  return searchParamsFormat;
}

export default function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let temp = pathname.split("/");
  temp.splice(1, 1);
  const pathnameWithoutLang = temp.join("/");
  const lang = pathname.split("/")[1];
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
              router.push("/en" + pathnameWithoutLang + searchParamsFormat(Array.from(searchParams.entries())));
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
              router.push("/fr" + pathnameWithoutLang + searchParamsFormat(Array.from(searchParams.entries())));
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
