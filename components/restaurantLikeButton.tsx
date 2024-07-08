"use client";

import { restaurantLike } from "@/actions/restaurantLike";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RestaurantLikeButton({
  restaurantId,
  initialIsLiked,
}: {
  restaurantId: string;
  initialIsLiked: boolean;
}) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  async function actionHandler(formData: FormData) {
    const data = await restaurantLike(formData, restaurantId);
    if (data.success) {
      console.log(data.message);
      setIsLiked(!isLiked);
      router.refresh();
    } else {
      console.log(data.message);
    }
  }
  return (
    <form action={actionHandler}>
      <Button variant={isLiked ? "default" : "outline"} size="icon" className="rounded-full size-9 flex-none">
        <Heart className="size-5" />
      </Button>
    </form>
  );
}
