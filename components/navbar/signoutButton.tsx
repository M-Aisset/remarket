"use client";

import { signout } from "@/actions/signout";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function SignoutButton() {
  const router = useRouter();
  async function actionHandler(formData: FormData) {
    const data = await signout(formData);
    if (data.success) {
      console.log(data.message);
      router.refresh();
    } else {
      console.log(data.message);
    }
  }
  return (
    <form action={actionHandler} className="w-full">
      <Button variant="ghost" className="flex justify-start items-center w-full py-1.5 px-2 font-normal">
        <LogOut className="mr-2 h-4" />
        <span>Log out</span>
      </Button>
    </form>
  );
}
