"use client";

import { GanttChartSquare } from "lucide-react";
import Link from "next/link";
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

export default function RestaurantRegisterButton() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <Link
      href={`/restaurantRegister?from=${
        pathname + encodeURIComponent(searchParamsFormat(Array.from(searchParams.entries())))
      }`}
      className="flex justify-start items-center w-full py-2 px-2"
    >
      <GanttChartSquare className="mr-2 h-4" />
      <span>Create restaurant</span>
    </Link>
  );
}
