"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFilterStore } from "@/store/useFilterStore";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function haveSameElements<T>(arr1: T[], arr2: T[]): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }

  const sortedArr1 = arr1.slice().sort();
  const sortedArr2 = arr2.slice().sort();

  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i] !== sortedArr2[i]) {
      return false;
    }
  }

  return true;
}

export default function SearchInput({
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
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(searchParams.searchQuery);
  const categoriesParam = searchParams.categories as string;
  let categoriesArray = categoriesParam.split(",");

  const wilayaParam = searchParams.wilaya as string;

  const offeringsParam = searchParams.offerings as string;
  let offeringsArray = offeringsParam.split(",");

  const ratingParam = searchParams.rating as string;

  const filters = useFilterStore((state) => state.filters);
  const setFilters = useFilterStore((state) => state.setFilters);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setFilters({
      rating: ratingParam,
      categories: categoriesArray,
      wilaya: wilayaParam,
      offerings: offeringsArray,
    });
    setLoading(true);
  }, []);
  return (
    <div className="w-full">
      <p
        className={`lg:hidden text-primary text-sm mb-1 ${
          (searchParams.rating !== filters.rating ||
            !haveSameElements<string>(categoriesArray, filters.categories) ||
            searchParams.wilaya !== filters.wilaya ||
            !haveSameElements<string>(offeringsArray, filters.offerings)) &&
          loading
            ? ""
            : "hidden"
        }`}
      >
        *Filters modified but not applied*
      </p>
      <form
        className="w-full flex justify-start items-center"
        onSubmit={(e) => {
          e.preventDefault();
          router.push(
            `/search?searchQuery=${searchQuery}&sort=${searchParams.sort}&rating=${searchParams.rating}&categories=${searchParams.categories}&offerings=${searchParams.offerings}&wilaya=${searchParams.wilaya}`
          );
        }}
      >
        <Input
          className="md:max-w-[35rem] w-full bg-muted rounded-r-none focus-visible:ring-offset-0"
          type="text"
          placeholder="Search"
          defaultValue={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button className="p-3 rounded-l-none">
          <SearchIcon />
        </Button>
      </form>
    </div>
  );
}
