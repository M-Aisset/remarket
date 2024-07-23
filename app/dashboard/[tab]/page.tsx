import RatingStatistics from "@/components/pages/dashboard/ratingStatistics";
import { Button } from "@/components/ui/button";
import { BanknoteIcon, Home, Info, MoreVertical, MoveRight, Settings as SettingsIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import MobileNavigation from "@/components/pages/dashboard/mobileNavigation";
import { notFound } from "next/navigation";
import Settings from "@/components/pages/dashboard/settings";
import Overview from "@/components/pages/dashboard/overview";

export default function Dashboard({ params }: { params: { tab: string } }) {
  if (params.tab !== "overview" && params.tab !== "billing" && params.tab !== "settings") notFound();
  return (
    <div className="pb-11 py-6 lg:px-20 px-8">
      <p className="text-3xl font-semibold">Dashboard</p>
      <div className="mt-6 md:mt-8 md:flex-row flex-col flex justify-start items-start md:gap-8 gap-4">
        <MobileNavigation params={params} />
        <div className="flex-none w-[11rem] md:flex hidden justify-start items-start flex-col gap-2">
          <Link href="/dashboard/overview" className="w-full">
            <Button variant="ghost" className={`w-full justify-start ${params.tab === "overview" && "bg-accent"}`}>
              <Home className="size-4 mr-1.5" />
              Overview
            </Button>
          </Link>
          <Link href="/dashboard/billing" className="w-full hidden">
            <Button variant="ghost" className={`w-full justify-start ${params.tab === "billing" && "bg-accent"}`}>
              <BanknoteIcon className="size-[1.12rem] mr-1.5" />
              Billing
            </Button>
          </Link>
          <Link href="/dashboard/settings" className="w-full">
            <Button variant="ghost" className={`w-full justify-start ${params.tab === "settings" && "bg-accent"}`}>
              <SettingsIcon className="size-4 mr-1.5" />
              Settings
            </Button>
          </Link>
        </div>
        <div className={`w-full ${params.tab !== "overview" ? "hidden" : "grid"}`}>
          <Overview />
        </div>
        <div className={`w-full ${params.tab !== "billing" ? "hidden" : "grid"}`}>
          <div className="w-full h-[10rem] border rounded-md flex flex-col justify-between items-start p-5 gap-4">
            <div className="w-full">
              <div className="w-full flex justify-between items-center gap-3">
                <p className="text-2xl font-semibold leading-none tracking-tight">Subscription</p>
                <Button variant="ghost" size="icon" className="rounded-full size-9">
                  <Info />
                </Button>
              </div>
              <p className="mt-1 text-muted-foreground text-sm">Manage your subscription for this application.</p>
            </div>
            <Button>
              Pay Subscription <MoveRight className="size-5 ml-2" />
            </Button>
          </div>
        </div>
        <div className={`w-full ${params.tab !== "settings" ? "hidden" : "grid"}`}>
          <Settings />
        </div>
      </div>
    </div>
  );
}
