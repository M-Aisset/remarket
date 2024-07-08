import { GanttChartSquare, Heart, LayoutDashboard, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import SignoutButton from "./signoutButton";
import connectToDatabase from "@/lib/mongodb";
import { IRestaurant, Restaurant } from "@/models/restaurant";

export default async function ProfileMenu({
  userId,
  profileImageUrl,
  userName,
}: {
  userId: string;
  profileImageUrl: string;
  userName: string;
}) {
  await connectToDatabase();
  const restaurant: IRestaurant | null = await Restaurant.findOne({ user: userId });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-10 w-10 cursor-pointer">
          <AvatarImage src={profileImageUrl} />
          <AvatarFallback>{Array.from(userName)[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4 min-w-[12rem]">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuItem className="p-0">
          <Link href="/dashboard" className="flex justify-start items-center w-full py-1.5 px-2">
            <Heart className="mr-2 h-4 stroke-[2.3]" />
            <span>Favorite Restaurant</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuItem className="p-0">
          {restaurant ? (
            <Link href="/dashboard" className="flex justify-start items-center w-full py-1.5 px-2">
              <GanttChartSquare className="mr-2 h-4" />
              <span>Restaurant Dashboard</span>
            </Link>
          ) : (
            <Link href="/restaurantRegister" className="flex justify-start items-center w-full py-1.5 px-2">
              <GanttChartSquare className="mr-2 h-4" />
              <span>Create restaurant</span>
            </Link>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuItem className="p-0">
          <Link href="/settings" className="flex justify-start items-center w-full py-1.5 px-2">
            <Settings className="mr-2 h-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0">
          <SignoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
