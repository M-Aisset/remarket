"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFilterStore } from "@/store/useFilterStore";
import { SlidersHorizontal, Star } from "lucide-react";
import Link from "next/link";

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

export default function MobileFilter({
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
  const filters = useFilterStore((state) => state.filters);
  const setFilters = useFilterStore((state) => state.setFilters);

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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex justify-center items-center gap-1 lg:hidden relative" size="sm">
          Filters : <SlidersHorizontal className="size-4" />
          <span
            className={`absolute top-0 right-0 inline-flex rounded-full h-2 w-2 bg-primary animate-ping	${
              searchParams.rating === "any" &&
              searchParams.categories === "any" &&
              searchParams.wilaya === "any" &&
              searchParams.offerings === "any"
                ? "hidden"
                : ""
            }`}
          />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="py-2 text-start text-3xl">Filters</DialogTitle>
          <div className="text-foreground h-[20rem] overflow-y-auto">
            <p className="text-start text-xl font-semibold">Price :</p>
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
                  <Star className="size-4" />
                  {ratingButton.value}
                </Button>
              ))}
            </div>
            <p className="mt-6 text-start text-xl font-semibold">wilaya :</p>
            <div className="mt-4 flex justify-start items-center flex-wrap gap-2">
              {algWilayas.map((wilaya, index) => (
                <Button
                  key={index}
                  className="rounded-xl border"
                  size="sm"
                  variant={filters.wilaya === wilaya ? "default" : "outline"}
                  onClick={() =>
                    filters.wilaya === wilaya
                      ? setFilters({ ...filters, wilaya: "any" })
                      : setFilters({ ...filters, wilaya: wilaya })
                  }
                >
                  {index + 1 + "-" + wilaya}
                </Button>
              ))}
            </div>
            <p className="mt-6 text-start text-xl font-semibold">Category :</p>
            <div className="mt-4 flex justify-start items-center flex-wrap gap-2">
              {restaurantCategories.map((restaurantCategory, index) => (
                <Button
                  key={index}
                  className="rounded-xl border"
                  size="sm"
                  variant={categoriesParamContoller(restaurantCategory).isChecked ? "default" : "outline"}
                  onClick={() => {
                    setFilters({
                      ...filters,
                      categories: categoriesParamContoller(restaurantCategory).newCategoriesArray,
                    });
                  }}
                >
                  {restaurantCategory}
                </Button>
              ))}
            </div>
            <p className="mt-6 text-start text-xl font-semibold">Offerings :</p>
            <div className="mt-4 flex justify-start items-center flex-wrap gap-2">
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
          <div className="pt-4 flex justify-center items-center gap-2">
            <Link
              href={`/search?searchQuery=${searchParams.searchQuery}&sort=review&rating=${
                filters.rating
              }&categories=${filters.categories.join(",")}&offerings=${filters.offerings.join(",")}&wilaya=${
                filters.wilaya
              }`}
            >
              <DialogClose asChild>
                <Button className="w-24">Apply</Button>
              </DialogClose>
            </Link>

            <Link
              href={`/search?searchQuery=${searchParams.searchQuery}&sort=${searchParams.sort}&rating=any&categories=any&offerings=any&wilaya=any`}
            >
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="w-24"
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
              </DialogClose>
            </Link>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
