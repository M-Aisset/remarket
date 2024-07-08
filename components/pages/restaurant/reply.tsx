"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, MoreVertical, Star } from "lucide-react";
import ReviewLikeButton from "./reviewLikeButton";
import { useRef, useState } from "react";
import { addReply } from "@/actions/addReply";

export default function Reply({
  restaurantId,
  id,
  parentId,
  profileImage,
  username,
  content,
  likeNumber,
  isLiked,
  isRepliesHidden,
}: {
  restaurantId: string;
  id: string;
  parentId: string;
  profileImage: string;
  username: string;
  content: string;
  likeNumber: number;
  isLiked: boolean;
  isRepliesHidden: boolean;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isReplyInputsHidden, setIsReplyInputsHidden] = useState(true);
  async function actionHandler(formData: FormData) {
    const data = await addReply(formData, restaurantId, parentId);
    if (data.success) {
      console.log(data.message);
      setIsReplyInputsHidden(true);
      formRef.current?.reset();
    } else {
      console.log(data.message);
    }
  }
  return (
    <div className={`mt-7 flex justify-start items-start gap-2 ${isRepliesHidden ? "hidden" : ""}`}>
      <Avatar className="size-9 flex-none">
        <AvatarImage src={profileImage} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="w-full">
        <div className="flex justify-between items-center">
          <p>
            <span className="font-semibold text-lg">@{username}</span>
          </p>
          <Button variant="outline" size="icon" className="rounded-full size-9">
            <MoreVertical />
          </Button>
        </div>
        <p className="mt-1">{content}</p>
        <div className="mt-1 flex justify-start items-center gap-3">
          <ReviewLikeButton reviewId={id} initialLikeNumber={likeNumber} initialIsLiked={isLiked} />
          <Button
            variant="ghost"
            size="sm"
            className="px-1"
            onClick={() => setIsReplyInputsHidden(!isReplyInputsHidden)}
          >
            Reply
          </Button>
        </div>
        <form ref={formRef} action={actionHandler} className={`${isReplyInputsHidden ? "hidden" : ""}`}>
          <textarea
            name="content"
            defaultValue={"@" + username + " "}
            placeholder="Add a reply..."
            className="p-1 w-full h-10 outline-none bg-background border-b resize-none"
          />
          <div className="flex justify-end items-center gap-3 mt-4">
            <Button
              type="button"
              variant="outline"
              className="border"
              onClick={() => setIsReplyInputsHidden(true)}
            >
              Cancel
            </Button>
            <Button type="submit" className="border">
              Reply
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
