import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import NavbarOptions from "./navbarOptions";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import SigninButton from "./signinButton";
import ProfileToggle from "./profileToggle";
import { getSession } from "@/lib/auth";
import { IUser, User } from "@/models/user";
import connectToDatabase from "@/lib/mongodb";

export default async function Navbar() {
  const session = await getSession();
  await connectToDatabase();
  const user: IUser | null = await User.findById(session?.user.id);
  return (
    <div className="z-30 h-16 sm:px-12 px-4 backdrop-blur-lg bg-background/75 sticky top-0 border-b flex justify-between items-center">
      <div className="flex justify-center items-center gap-8">
        <div className="flex justify-center items-center gap-2">
          <div className="sm:hidden">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle className="text-2xl">Navigation</DrawerTitle>
                  <DrawerDescription>Find Your Way Around</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className="px-10">
                  <Link href="/">
                    <DrawerClose asChild>
                      <Button className="w-full" variant="outline">
                        Home
                      </Button>
                    </DrawerClose>
                  </Link>
                  <Link href="/search?searchQuery=&sort=random&rating=any&categories=any&offerings=any&wilaya=any">
                    <DrawerClose asChild>
                      <Button className="w-full" variant="outline">
                        Search
                      </Button>
                    </DrawerClose>
                  </Link>
                  <Link href="/">
                    <DrawerClose asChild>
                      <Button className="w-full" variant="outline">
                        Contact
                      </Button>
                    </DrawerClose>
                  </Link>
                  <DrawerClose asChild>
                    <Button className="w-full">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
          <Link href="/" className="flex justify-center items-center gap-2">
            <Image className="xs:block hidden" src="/logo.png" alt="Logo" width={35} height={35} />
            <Image className="xs:hidden block" src="/logo.png" alt="Logo" width={40} height={40} />
            <p className="text-[1.6rem] font-medium xs:block hidden">Remarket</p>
          </Link>
        </div>
        <div className="sm:flex hidden justify-center items-center gap-1 ">
          <Link href="/">
            <Button variant="ghost" size="sm">
              Home
            </Button>
          </Link>
          <Link href="/search?searchQuery=&sort=random&rating=any&categories=any&offerings=any&wilaya=any">
            <Button variant="ghost" size="sm">
              Search
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm">
              Contact
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center sm:gap-5 gap-3">
        <NavbarOptions />
        {session && user !== null ? (
          <ProfileToggle userId={user.id} profileImageUrl={user.profileImageUrl} userName={user.userName} />
        ) : (
          <SigninButton />
        )}
      </div>
    </div>
  );
}
