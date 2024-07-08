import { Button } from "@/components/ui/button";
import { MoveRight, Plus } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n.config";

export default async function Home({ params }: { params: { lang: Locale } }) {
  const heroImg = [
    "/HeroImages/burger-100.png",
    "/HeroImages/pizza-100.png",
    "/HeroImages/chicken-100.png",
    "/HeroImages/fries-100.png",
    "/HeroImages/burrito-100.png",
  ];

  const dic = await getDictionary(params.lang);
  return (
    <div>
      <div className="relative overflow-hidden border-b">
        <div className="absolute rounded-full -z-10 left-0 bottom-0 -mb-[14rem] -ml-[14rem] sm:bg-pink-500/50 dark:sm:bg-pink-500/30 bg-pink-500/30 h-[28rem] w-[28rem] dark:blur-[9rem] blur-[18rem]"></div>
        <div className="absolute rounded-full -z-10 right-0 top-0 -mt-[14rem] -mr-[14rem] sm:bg-indigo-500/50 dark:sm:bg-indigo-500/30 bg-indigo-500/30 h-[28rem] w-[28rem] dark:blur-[9rem] blur-[18rem]"></div>
        <div className="px-6 md:px-16 pt-16 md:pt-20 pb-14 md:pb-24">
          <Link
            href="/"
            className="inline-flex justify-start items-center gap-2 bg-pink-200 dark:bg-pink-950/50 border border-pink-500 py-1 px-3 rounded-xl"
          >
            <p className="text-sm">Info : The first 20 restaurant accounts for free</p>
            <MoveRight />
          </Link>
          <div className="flex justify-start items-center gap-20 mt-12 pl-2">
            {heroImg.map((img, i) => (
              <Image
                key={i}
                src={img}
                height={40}
                width={40}
                className="invert-[70%] dark:invert-0"
                alt={"Food icon " + i}
              />
            ))}
          </div>
          <div className="flex flex-col lgp:flex-row justify-center items-start lgp:gap-16 gap-8 mt-8">
            <p className="lgp:w-3/5 w-full sm:text-7xl text-6xl">{dic.homePage.title}</p>
            <div className="lgp:w-2/5 w-full flex flex-col justify-center items-start gap-8">
              <p className="sm:text-lg text-base text-muted-foreground">
                Embark on a culinary voyage through our extensive selection of restaurants, explore thousands of
                restaurants, read honest reviews from real diners, and find your next culinary adventure. No more
                takeout menus, just delicious decisions.
              </p>
              <div>
                <Button>Get the app</Button>
                <Link href="/search?searchQuery=&sort=random&rating=any&categories=any&offerings=any&wilaya=any">
                  <Button variant="outline" className="ml-4">
                    Search
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-14 px-6 md:px-20">
        <p className="text-3xl font-semibold ">About us</p>
        <p className="text-sm text-muted-foreground">Discover Our Content.</p>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="relative group border flex flex-col justify-center items-center p-4">
            <Plus className="absolute top-0 right-0 size-6 -mt-3 -mr-3" />
            <Plus className="absolute top-0 left-0 size-6 -mt-3 -ml-3" />
            <Plus className="absolute bottom-0 right-0 size-6 -mb-3 -mr-3" />
            <Plus className="absolute bottom-0 left-0 size-6 -mb-3 -ml-3" />
            <div className="w-full aspect-video">
              <Image
                height={0}
                width={0}
                quality={30}
                sizes="100vw"
                style={{ width: "100%", height: "100%" }}
                src="/HeroImages/restaurant-hero.jpg"
                alt="Restaurant hero image"
                className="rounded-md transition-transform duration-300 ease-in-out sm:group-hover:scale-[1.02]"
              />
            </div>
            <div className="mt-4">
              <p className="sm:text-lg">
                Restaurants can create detailed profiles with essential information such as address, phone number,
                hours of operation, and a description of their offerings.
              </p>
            </div>
          </div>
          <div className="relative group border flex flex-col justify-center items-center p-4">
            <Plus className="absolute top-0 right-0 size-6 -mt-3 -mr-3" />
            <Plus className="absolute top-0 left-0 size-6 -mt-3 -ml-3" />
            <Plus className="absolute bottom-0 right-0 size-6 -mb-3 -mr-3" />
            <Plus className="absolute bottom-0 left-0 size-6 -mb-3 -ml-3" />
            <div className="w-full aspect-video">
              <Image
                height={0}
                width={0}
                quality={30}
                sizes="100vw"
                style={{ width: "100%", height: "100%" }}
                src="/HeroImages/dishe-hero.jpg"
                alt="Dishe hero image"
                className="rounded-md transition-transform duration-300 ease-in-out sm:group-hover:scale-[1.02]"
              />
            </div>
            <div className="mt-4">
              <p className="sm:text-lg">
                Customers can leave reviews and rate their dining experiences, helping others make informed
                decisions. These reviews can include text, and star ratings.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-14 px-6 md:px-20">
        <p className="text-3xl font-semibold">Frequently asked questions</p>
        <p className="text-sm text-muted-foreground">
          Can&apos;t find the answer you&apos;re looking for?{" "}
          <Link className="text-primary hover:text-primary/80" href="/">
            contact us
          </Link>
          .
        </p>
        <div className="mt-6 flex justify-between items-center gap-12">
          <Accordion type="single" collapsible className="flex-1">
            <AccordionItem value="item-1">
              <AccordionTrigger className="md:text-xl md:mb-4 text-left text-pretty">
                What is the services of the website ?
              </AccordionTrigger>
              <AccordionContent className="md:text-base text-muted-foreground">
                A user-friendly online platform enabling customers to browse, select, and order dishes tailored to
                their preferences, along with a comprehensive management system and marketplace for restaurants.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="md:text-xl md:mb-4 text-left text-pretty">
                What is the price of your services ?
              </AccordionTrigger>
              <AccordionContent className="md:text-base text-muted-foreground">
                Restaurants are required to pay a monthly subscription fee of 500 Da for our services, while access
                for customers is free.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="md:text-xl md:mb-4 text-left text-pretty">
                How can i put my restaurant in this website ?
              </AccordionTrigger>
              <AccordionContent className="md:text-base text-muted-foreground">
                You need to enter the restaurant information, pay the monthly subscription, and wait for account
                validation. After validation, you are free to list your dishes.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="md:text-xl md:mb-4 text-left text-pretty">
                What payment methods do you accept ?
              </AccordionTrigger>
              <AccordionContent className="md:text-base text-muted-foreground">
                Currently, we only accept the Eldhabia card as a method of payment.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="md:text-xl md:mb-4 text-left text-pretty">
                How can I contact customer support ?
              </AccordionTrigger>
              <AccordionContent className="md:text-base text-muted-foreground">
                You can reach our customer support team via the &quot;Contact Us&quot; page or by email at
                restmarket.support@gmail.com
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Image
            height={0}
            width={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            src="/HeroImages/hero1.jpg"
            alt="Hero1"
            className="rounded-md hidden lgp:block mt-6 max-w-[37rem]"
          />
        </div>
      </div>
      <div className="my-14 px-6 md:px-20">
        <p className="text-3xl font-semibold ">Get the app</p>
        <p className="text-sm text-muted-foreground">It&apos;s easier in the app.</p>
        <div className="flex items-center justify-between flex-col lg:flex-row gap-12 mt-6">
          <Dialog>
            <DialogTrigger className="w-full">
              <div className="group border rounded-md flex items-center justify-between gap-2 py-4 px-6 w-full">
                <Image
                  height={0}
                  width={0}
                  sizes="100vw"
                  style={{ width: "30%", height: "auto" }}
                  src="/qr-code.png"
                  alt="qr-code"
                  className="mr-4"
                />
                <div className="flex items-center justify-between gap-7 flex-1">
                  <div>
                    <p className="text-left font-medium md:text-xl text-lg group-hover:underline">
                      Download the app for android
                    </p>
                    <p className="text-left md:text-base text-sm mt-2 text-muted-foreground">Scan to download</p>
                  </div>
                  <MoveRight className="transition duration-400 ease-in-out group-hover:translate-x-3 " />
                </div>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-2xl">Coming soon!</DialogTitle>
                <DialogDescription>We&apos;re hard at work on it. Stay tuned.</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger className="w-full">
              <div className="group border rounded-md flex items-center justify-between gap-2 py-4 px-6 w-full">
                <Image
                  height={0}
                  width={0}
                  sizes="100vw"
                  style={{ width: "30%", height: "auto" }}
                  src="/qr-code.png"
                  alt="qr-code"
                  className="mr-4"
                />
                <div className="flex items-center justify-between gap-7 flex-1">
                  <div>
                    <p className="text-left font-medium md:text-xl text-lg group-hover:underline">
                      Download the app for ios
                    </p>
                    <p className="text-left md:text-base text-sm mt-2 text-muted-foreground">Scan to download</p>
                  </div>
                  <MoveRight className="transition duration-400 ease-in-out group-hover:translate-x-3 " />
                </div>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-2xl">Coming soon!</DialogTitle>
                <DialogDescription>We&apos;re hard at work on it. Stay tuned.</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
