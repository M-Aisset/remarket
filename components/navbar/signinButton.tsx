"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname, useSearchParams } from "next/navigation";

function searchParamsFormat(searchParamsArray: [string, string][]) {
  if (searchParamsArray.length === 0) return "";
  let searchParamsFormat = "?";
  searchParamsArray.forEach((searchParam) => {
    searchParamsFormat = searchParamsFormat.concat(searchParam[0] + "=" + searchParam[1] + "&");
  });
  searchParamsFormat = searchParamsFormat.slice(0, -1);
  return searchParamsFormat;
}

export default function SigninButton() {
  const pathname = usePathname();
  let temp = pathname.split("/");
  temp.splice(1, 1);
  const pathnameWithoutLang = temp.join("/");
  const searchParams = useSearchParams();
  return (
    <Link
      className={pathnameWithoutLang === "/signin" || pathnameWithoutLang === "/register" ? "hidden" : ""}
      href={`/signin?from=${
        pathname + encodeURIComponent(searchParamsFormat(Array.from(searchParams.entries())))
      }`}
    >
      <Button>Sign in</Button>
    </Link>
  );
}
