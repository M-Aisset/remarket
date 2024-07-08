import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Dishe from "@/components/dishe";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function PopularDishes({
  popularDishes,
  menuPagesImageUrl,
}: {
  popularDishes: { imageUrl: string; name: string; price: number }[];
  menuPagesImageUrl: string[];
}) {
  return (
    <div className="pt-10">
      <div className="flex justify-between items-center">
        <p className="text-[1.6rem] font-semibold">Popular Dishes</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              Full menu
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogTitle className="text-3xl">Full Menu</DialogTitle>
            <div className="h-80 overflow-y-auto">
              {menuPagesImageUrl.map((menuPageImageUrl, index) => (
                <div key={index}>
                  <Image
                    height={0}
                    width={0}
                    quality={50}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                    src={menuPageImageUrl}
                    alt="Menu page"
                    className="mt-3"
                  />
                  <p className="pt-2 text-center">
                    Page {index + 1} / {menuPagesImageUrl.length}
                  </p>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex-none pt-4">
        <Carousel>
          <CarouselContent>
            {popularDishes.map((dishe, index) => (
              <CarouselItem key={index} className="lgp:basis-1/4 lg:basis-1/3 xsp:basis-1/2">
                <div className="p-1">
                  <Dishe name={dishe.name} image={dishe.imageUrl} price={dishe.price} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
