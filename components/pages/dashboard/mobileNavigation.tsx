"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BanknoteIcon, Home, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MobileNavigation({ params }: { params: { tab: string } }) {
  const router = useRouter();
  return (
    <Tabs defaultValue={params.tab} className="w-full md:hidden">
      <TabsList className="w-full justify-between">
        <TabsTrigger value="overview" onClick={() => router.push("/dashboard/overview")}>
          <Home className="size-4 mr-1.5" /> Overview
        </TabsTrigger>
        <TabsTrigger className="hidden" value="billing" onClick={() => router.push("/dashboard/billing")}>
          <BanknoteIcon className="size-[1.12rem] mr-1.5" />
          Billing
        </TabsTrigger>
        <TabsTrigger value="settings" onClick={() => router.push("/dashboard/settings")}>
          <Settings className="size-4 mr-1.5" />
          Settings
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
