"use client";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
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
  const [likeNumber, setLikeNumber] = useState(initialLikeNumber);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  return (
    <Button
      variant="ghost"
      className="px-0"
      onClick={() => {
        isLiked ? setLikeNumber(likeNumber - 1) : setLikeNumber(likeNumber + 1);
        setIsLiked(!isLiked);
      }}
    >
      <Heart className={`size-6 mr-1 ${isLiked ? "fill-primary" : ""}`} />
      {likeNumber}
    </Button>
  );
}
