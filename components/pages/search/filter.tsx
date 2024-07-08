"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFilterStore } from "@/store/useFilterStore";
import { Pencil, Star, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const ratingButtons = [
  {
    value: "1.0",
    className:
      "rounded-xl rounded-r-none border-r-0 w-14 text-sm border-primary flex justify-center items-center gap-1 px-1.5",
  },
  {
    value: "2.0",
    className: "rounded-none border-r-0 w-14 text-sm border-primary flex justify-center items-center gap-1 px-1.5",
  },
  {
    value: "3.0",
    className: "rounded-none border-r-0 w-14 text-sm border-primary flex justify-center items-center gap-1 px-1.5",
  },
  {
    value: "4.0",
    className: "rounded-none border-r-0 w-14 text-sm border-primary flex justify-center items-center gap-1 px-1.5",
  },
  {
    value: "5.0",
    className:
      "rounded-xl rounded-l-none w-14 text-sm border-primary flex justify-center items-center gap-1 px-1.5",
  },
];
const algWilayas = [
  "Adrar",
  "Chlef",
  "Laghouat",
  "Oum El Bouaghi",
  "Batna",
  "Béjaïa",
  "Biskra",
  "Béchar",
  "Blida",
  "Bouira",
  "Tamanrasset",
  "Tébessa",
  "Tlemcen",
  "Tiaret",
  "Tizi Ouzou",
  "Alger",
  "Djelfa",
  "Jijel",
  "Sétif",
  "Saïda",
  "Skikda",
  "Sidi Bel Abbès",
  "Annaba",
  "Guelma",
  "Constantine",
  "Médéa",
  "Mostaganem",
  "M'Sila",
  "Mascara",
  "Ouargla",
  "Oran",
  "El Bayadh",
  "Illizi",
  "Bordj Bou Arréridj",
  "Boumerdès",
  "El Tarf",
  "Tindouf",
  "Tissemsilt",
  "El Oued",
  "Khenchela",
  "Souk Ahras",
  "Tipaza",
  "Mila",
  "Aïn Defla",
  "Naama",
  "Aïn Témouchent",
  "Ghardaïa",
  "Relizane",
  "Timimoun",
  "Bordj Badji Mokhtar",
  "Ouled Djellal",
  "Béni Abbès",
  "d'In Salah",
  "d'In Guezzam",
  "Touggourt",
  "Djanet",
  "d'El M'Ghair",
  "d'El Meniaa",
];
const restaurantCategories = [
  "Italian",
  "Restaurants",
  "American",
  "Seafood",
  "Diners",
  "Southern",
  "Mediterranean",
  "Burmese",
  "Nightlife",
  "Comfort Food",
  "Tapas/Small Plates",
  "Mexican",
  "Tacos",
  "Burgers",
  "Pizza",
  "Peruvian",
  "Thai",
  "Asian Fusion",
  "Pasta Shops",
  "Lebanese",
  "Salad",
  "Barbeque",
  "Indian",
  "Chinese",
  "Korean",
  "Vegetarian",
  "Middle Eastern",
  "Buffets",
  "Arabic",
  "Dim Sum",
  "Vietnamese",
  "Caterers",
  "Himalayan/Nepalese",
  "Ramen",
  "Soup",
  "Specialty Food",
  "Japanese",
  "Food Delivery Services",
  "Izakaya",
  "Laotian",
  "Food",
  "Taiwanese",
  "Hot Pot",
  "Noodles",
];
const restaurantOfferings = ["Reservations", "Offers Delivery", "Outdoor Seating", "Takeaway"];

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

export default function Filter({
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
  function categoriesParamContoller(category: string) {
    let categoriesArray = filters.categories;
    categoriesArray = categoriesArray.filter((e) => e !== "any");

    if (categoriesArray.includes(category)) {
      categoriesArray = categoriesArray.filter((e) => e !== category);
      if (categoriesArray.length === 0)
        return {
          newCategoriesArray: ["any"],
          isChecked: !categoriesArray.includes(category),
        };
      return {
        newCategoriesArray: categoriesArray,
        isChecked: !categoriesArray.includes(category),
      };
    }
    categoriesArray.push(category);
    return {
      newCategoriesArray: categoriesArray,
      isChecked: !categoriesArray.includes(category),
    };
  }

  function offeringsParamContoller(offering: string) {
    let offeringsArray = filters.offerings;
    offeringsArray = offeringsArray.filter((e) => e !== "any");

    if (offeringsArray.includes(offering)) {
      offeringsArray = offeringsArray.filter((e) => e !== offering);
      if (offeringsArray.length === 0)
        return {
          newOfferingsArray: ["any"],
          isChecked: !offeringsArray.includes(offering),
        };
      return {
        newOfferingsArray: offeringsArray,
        isChecked: !offeringsArray.includes(offering),
      };
    }
    offeringsArray.push(offering);
    return {
      newOfferingsArray: offeringsArray,
      isChecked: !offeringsArray.includes(offering),
    };
  }
  return (
    <div className="w-full">
      <p className="text-xl font-semibold relative inline pr-4">
        Filters
        <span
          className={`absolute top-0 right-0 inline-flex rounded-full h-2 w-2 bg-primary animate-ping ${
            searchParams.rating === "any" &&
            searchParams.categories === "any" &&
            searchParams.wilaya === "any" &&
            searchParams.offerings === "any"
              ? "hidden"
              : ""
          }`}
        />
      </p>
      <p
        className={`text-primary text-sm ${
          (searchParams.rating !== filters.rating ||
            !haveSameElements<string>(categoriesArray, filters.categories) ||
            searchParams.wilaya !== filters.wilaya ||
            !haveSameElements<string>(offeringsArray, filters.offerings)) &&
          loading
            ? ""
            : "invisible"
        }`}
      >
        *Filters modified but not applied*
      </p>
      <div className="pb-4 pt-1 px-1 border-b">
        <p className="font-medium relative inline pr-4">Rating</p>
        <div className="mt-4 flex justify-start items-center">
          {ratingButtons.map((ratingButton, index) => (
            <Button
              key={index}
              variant={filters.rating === ratingButton.value ? "default" : "outline"}
              size="sm"
              className={ratingButton.className}
              onClick={(e) =>
                filters.rating === ratingButton.value
                  ? setFilters({ ...filters, rating: "any" })
                  : setFilters({ ...filters, rating: ratingButton.value })
              }
            >
              {ratingButton.value}
              <Star className="size-4" />
            </Button>
          ))}
        </div>
      </div>
      <div className="py-4 px-1 border-b">
        <p className="font-medium relative inline pr-4">Wilaya</p>
        <div className="mt-4">
          <RadioGroup defaultValue={filters.wilaya}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="any"
                id="any"
                className="size-5"
                checked={filters.wilaya === "any"}
                onClick={() => setFilters({ ...filters, wilaya: "any" })}
              />
              <Label
                className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="any"
              >
                Any
              </Label>
            </div>
            {algWilayas.slice(0, 4).map((wilaya, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={wilaya}
                  id={wilaya}
                  className="size-5"
                  checked={filters.wilaya === wilaya}
                  onClick={() =>
                    filters.wilaya === wilaya
                      ? setFilters({ ...filters, wilaya: "any" })
                      : setFilters({ ...filters, wilaya: wilaya })
                  }
                />
                <Label
                  className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor={wilaya}
                >
                  {index + 1 + "-" + wilaya}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary/80 p-0 bg-background hover:bg-background"
              >
                See more
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="py-4">Wilaya</DialogTitle>
                <div className="h-[20rem] overflow-y-auto">
                  <RadioGroup className="grid grid-cols-2 gap-2 text-foreground" defaultValue={filters.wilaya}>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem
                        value="any"
                        id="any"
                        className="size-5"
                        checked={filters.wilaya === "any"}
                        onClick={() => setFilters({ ...filters, wilaya: "any" })}
                      />
                      <Label
                        className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="any"
                      >
                        Any
                      </Label>
                    </div>
                    {algWilayas.map((wilaya, index) => (
                      <div key={index} className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem
                          value={wilaya}
                          id={wilaya}
                          className="size-5"
                          checked={filters.wilaya === wilaya}
                          onClick={() =>
                            filters.wilaya === wilaya
                              ? setFilters({ ...filters, wilaya: "any" })
                              : setFilters({ ...filters, wilaya: wilaya })
                          }
                        />
                        <Label
                          className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor={wilaya}
                        >
                          {index + 1 + "-" + wilaya}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="py-4 px-1 border-b">
        <p className="font-medium relative inline pr-4">Categories</p>
        <div className="mt-4">
          {restaurantCategories.slice(0, 5).map((restaurantCategory, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <Checkbox
                id={restaurantCategory}
                className="size-5"
                checked={categoriesParamContoller(restaurantCategory).isChecked}
                onClick={() => {
                  setFilters({
                    ...filters,
                    categories: categoriesParamContoller(restaurantCategory).newCategoriesArray,
                  });
                }}
              />
              <Label
                htmlFor={restaurantCategory}
                className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {restaurantCategory}
              </Label>
            </div>
          ))}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary/80 p-0 bg-background hover:bg-background"
              >
                See more
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="py-4">Categories</DialogTitle>
                <div className="grid grid-cols-2 gap-2 text-foreground h-[20rem] overflow-y-auto">
                  {restaurantCategories.map((restaurantCategory, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        id={restaurantCategory}
                        className="size-5"
                        checked={categoriesParamContoller(restaurantCategory).isChecked}
                        onClick={() => {
                          setFilters({
                            ...filters,
                            categories: categoriesParamContoller(restaurantCategory).newCategoriesArray,
                          });
                        }}
                      />
                      <Label
                        htmlFor={restaurantCategory}
                        className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {restaurantCategory}
                      </Label>
                    </div>
                  ))}
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="py-4 px-1 border-b">
        <p className="font-medium relative inline pr-4">Offerings</p>
        <div className="mt-4 flex justify-start items-center flex-wrap gap-1">
          {restaurantOfferings.map((offering, index) => (
            <Button
              key={index}
              className="rounded-xl border"
              size="sm"
              variant={offeringsParamContoller(offering).isChecked ? "default" : "outline"}
              onClick={() => {
                setFilters({
                  ...filters,
                  offerings: offeringsParamContoller(offering).newOfferingsArray,
                });
              }}
            >
              {offering}
            </Button>
          ))}
        </div>
      </div>
      <div className="py-4 px-1 flex justify-start items-center gap-2">
        <Link
          href={`/search?searchQuery=${searchParams.searchQuery}&sort=${searchParams.sort}&rating=${
            filters.rating
          }&categories=${filters.categories.join(",")}&offerings=${filters.offerings.join(",")}&wilaya=${
            filters.wilaya
          }`}
        >
          <Button size="sm">Apply</Button>
        </Link>
        <Link
          href={`/search?searchQuery=${searchParams.searchQuery}&sort=${searchParams.sort}&rating=any&categories=any&offerings=any&wilaya=any`}
        >
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setFilters({
                rating: "any",
                categories: ["any"],
                wilaya: "any",
                offerings: ["any"],
              })
            }
          >
            Rest
          </Button>
        </Link>
      </div>
    </div>
  );
}
