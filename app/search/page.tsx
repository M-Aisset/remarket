import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpNarrowWide, Check } from "lucide-react";
import Link from "next/link";
import SearchInput from "@/components/pages/search/searchInput";
import SearchResult from "@/components/pages/search/searchResult";
import MobileFilter from "@/components/pages/search/mobileFilter";
import Filter from "@/components/pages/search/filter";
import { redirect } from "next/navigation";

export default function Search({
  searchParams,
}: {
  searchParams: {
    searchQuery: string | undefined;
    rating: string | undefined;
    categories: string | undefined;
    wilaya: string | undefined;
    offerings: string | undefined;
    sort: string | undefined;
  };
}) {
  if (
    searchParams.searchQuery === undefined ||
    searchParams.sort === undefined ||
    searchParams.rating === undefined ||
    searchParams.categories === undefined ||
    searchParams.offerings === undefined ||
    searchParams.wilaya === undefined
  )
    redirect("/search?searchQuery=&sort=random&rating=any&categories=any&offerings=any&wilaya=any");
  return (
    <div className="px-6 md:px-16 py-6 flex justify-start items-start gap-6">
      <div className="lgp:block hidden w-[22rem]">
        <Filter searchParams={searchParams} />
      </div>
      <div className="w-full">
        <div className="w-full flex flex-col md:flex-row justify-start items-start md:items-end md:gap-8 gap-2">
          <SearchInput searchParams={searchParams} />
          <div className="h-10 flex justify-center items-center gap-1">
            <MobileFilter searchParams={searchParams} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex justify-center items-center gap-1" size="sm">
                  Sort :
                  <ArrowUpNarrowWide className="size-[1.2rem] stroke-[1.5]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="p-0">
                  <Link
                    className="w-full h-full"
                    href={`/search?searchQuery=${searchParams.searchQuery}&sort=random&rating=${searchParams.rating}&categories=${searchParams.categories}&offerings=${searchParams.offerings}&wilaya=${searchParams.wilaya}`}
                  >
                    <Button variant="ghost" size="sm">
                      Random
                      <Check className={`ml-2 size-3 ${searchParams.sort === "random" ? "" : "hidden"}`} />
                    </Button>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0">
                  <Link
                    className="w-full h-full"
                    href={`/search?searchQuery=${searchParams.searchQuery}&sort=rating&rating=${searchParams.rating}&categories=${searchParams.categories}&offerings=${searchParams.offerings}&wilaya=${searchParams.wilaya}`}
                  >
                    <Button variant="ghost" size="sm">
                      Highest Rated
                      <Check className={`ml-2 size-3 ${searchParams.sort === "rating" ? "" : "hidden"}`} />
                    </Button>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0">
                  <Link
                    className="w-full h-full"
                    href={`/search?searchQuery=${searchParams.searchQuery}&sort=review&rating=${searchParams.rating}&categories=${searchParams.categories}&offerings=${searchParams.offerings}&wilaya=${searchParams.wilaya}`}
                  >
                    <Button variant="ghost" size="sm">
                      Most Reviewed
                      <Check className={`ml-2 size-3 ${searchParams.sort === "review" ? "" : "hidden"}`} />
                    </Button>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <SearchResult searchParams={searchParams} />
      </div>
    </div>
  );
}
