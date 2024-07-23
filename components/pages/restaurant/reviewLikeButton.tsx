"use client";
import { reviewLike } from "@/actions/reviewLike";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ReviewLikeButton({
  reviewId,
  initialLikeNumber,
  initialIsLiked,
}: {
  reviewId: string;
  initialLikeNumber: number;
  initialIsLiked: boolean;
}) {
  const router = useRouter();
  const [likeNumber, setLikeNumber] = useState(initialLikeNumber);
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  async function actionHandler(formData: FormData) {
    const data = await reviewLike(formData, reviewId);
    if (data.success) {
      console.log(data.message);
      if (data.message === "Review like removed successfully") {
        setLikeNumber((PrevLikeNumber) => PrevLikeNumber - 1);
      } else setLikeNumber((PrevLikeNumber) => PrevLikeNumber + 1);
      setIsLiked(!isLiked);
      router.refresh();
    } else {
      console.log(data.message);
    }
  }
  return (
    <form action={actionHandler}>
      <Button variant="ghost" className="px-0">
        <Heart className={`size-6 mr-1 ${isLiked ? "fill-primary" : ""}`} />
        {likeNumber}
      </Button>
    </form>
  );
}
