"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, ChevronUp, MoreVertical, Star } from "lucide-react";
import ReviewLikeButton from "./reviewLikeButton";
import { useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import Reply from "./reply";
import { useRouter } from "next/navigation";
import { addReply } from "@/actions/addReply";

export default function Review({
  restaurantId,
  reviewId,
  profileImage,
  username,
  rating,
  content,
  isLiked,
  likeNumber,
  replies,
}: {
  restaurantId: string;
  reviewId: string;
  profileImage: string;
  username: string;
  rating: string;
  content: string;
  isLiked: boolean;
  likeNumber: number;
  replies: {
    id: string;
    profileImage: string;
    username: string;
    content: string;
    likeNumber: number;
    isLiked: boolean;
  }[];
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isRepliesHidden, setIsRepliesHidden] = useState(true);
  const [isReplyInputsHidden, setIsReplyInputsHidden] = useState(true);

  async function actionHandler(formData: FormData) {
    const data = await addReply(formData, restaurantId, reviewId);
    if (data.success) {
      console.log(data.message);
      setIsReplyInputsHidden(true);
      formRef.current?.reset();
    } else {
      console.log(data.message);
    }
  }
  return (
    <div className="mt-7 flex justify-start items-start gap-2">
      <Avatar className="size-12 flex-none border">
        <AvatarImage src={profileImage} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="w-full">
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center gap-1">
            <p>
              <span className="font-semibold text-lg">@{username}</span>
            </p>
            <Star className="size-5 rounded-full bg-yellow-500 text-white p-1" />
            <span className="text-sm">{rating}</span>
          </div>
          <Button variant="outline" size="icon" className="rounded-full size-9">
            <MoreVertical />
          </Button>
        </div>
        <p className="mt-1">{content}</p>
        <div className="mt-1 flex justify-start items-center gap-3">
          <ReviewLikeButton reviewId={reviewId} initialLikeNumber={likeNumber} initialIsLiked={isLiked} />
          <Button
            variant="ghost"
            size="sm"
            className="px-1"
            onClick={() => setIsReplyInputsHidden(!isReplyInputsHidden)}
          >
            Reply
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`text-primary hover:text-primary/80 px-1 ${replies.length === 0 ? "hidden" : ""}`}
            onClick={() => setIsRepliesHidden(!isRepliesHidden)}
          >
            Show replies
            {isRepliesHidden ? <ChevronDown className="size-4 ml-1" /> : <ChevronUp className="size-4 ml-1" />}
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
        {replies.map((reply, index) => (
          <Reply
            key={index}
            id={reply.id}
            restaurantId={restaurantId}
            parentId={reviewId}
            profileImage={reply.profileImage}
            username={reply.username}
            content={reply.content}
            likeNumber={reply.likeNumber}
            isLiked={reply.isLiked}
            isRepliesHidden={isRepliesHidden}
          />
        ))}
      </div>
    </div>
  );
}
