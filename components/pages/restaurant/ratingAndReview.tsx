"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";
import Review from "@/components/pages/restaurant/review";
import { useRef, useState } from "react";
import { addReview } from "@/actions/addReview";
import { useRouter } from "next/navigation";

export default function RatingAndReview({
  restaurantId,
  rating,
  reviewsTotalNumber,
  reviewsNumber,
  reviews,
}: {
  restaurantId: string;
  rating: string;
  reviewsTotalNumber: number;
  reviewsNumber: { stars: number; number: number }[];
  reviews: {
    id: string;
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
  }[];
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [myRating, setMyRating] = useState("");

  async function actionHandler(formData: FormData) {
    formData.append("rating", myRating);
    const data = await addReview(formData, restaurantId);
    if (data.success) {
      console.log(data.message);
      formRef.current?.reset();
      setMyRating("");
    } else {
      console.log(data.message);
    }
  }
  return (
    <div className="py-10">
      <p className="text-[1.6rem] font-semibold">Rating & Reviews</p>
      <div className="pt-4 flex justify-between items-start gap-4 flex-col">
        <div className="w-full">
          <div className="flex justify-start items-center gap-2">
            <Star className="size-10 rounded-full bg-yellow-500 text-white p-1" />
            <span className="text-xl">
              {rating} ({reviewsTotalNumber} reviews)
            </span>
          </div>
        </div>
        <div className="w-full">
          <div className="flex justify-start items-center gap-6">
            <p className="flex-none text-nowrap font-medium w-16">5 Star</p>
            <Progress
              value={reviewsTotalNumber === 0 ? 0 : (reviewsNumber[0].number / reviewsTotalNumber) * 100}
              className="h-2"
            />
            <p className="flex-none text-nowrap w-12 text-center">
              {reviewsTotalNumber === 0 ? 0 : (reviewsNumber[0].number / reviewsTotalNumber) * 100} %
            </p>
          </div>
          <div className="flex justify-start items-center gap-6 mt-2">
            <p className="flex-none text-nowrap font-medium w-16">4 Star</p>
            <Progress
              value={reviewsTotalNumber === 0 ? 0 : (reviewsNumber[1].number / reviewsTotalNumber) * 100}
              className="h-2"
            />
            <p className="flex-none text-nowrap w-12 text-center">
              {reviewsTotalNumber === 0 ? 0 : (reviewsNumber[1].number / reviewsTotalNumber) * 100} %
            </p>
          </div>
          <div className="flex justify-start items-center gap-6 mt-2">
            <p className="flex-none text-nowrap font-medium w-16">3 Star</p>
            <Progress
              value={reviewsTotalNumber === 0 ? 0 : (reviewsNumber[2].number / reviewsTotalNumber) * 100}
              className="h-2"
            />
            <p className="flex-none text-nowrap w-12 text-center">
              {reviewsTotalNumber === 0 ? 0 : (reviewsNumber[2].number / reviewsTotalNumber) * 100} %
            </p>
          </div>
          <div className="flex justify-start items-center gap-6 mt-2">
            <p className="flex-none text-nowrap font-medium w-16">2 Star</p>
            <Progress
              value={reviewsTotalNumber === 0 ? 0 : (reviewsNumber[3].number / reviewsTotalNumber) * 100}
              className="h-2"
            />
            <p className="flex-none text-nowrap w-12 text-center">
              {reviewsTotalNumber === 0 ? 0 : (reviewsNumber[3].number / reviewsTotalNumber) * 100} %
            </p>
          </div>
          <div className="flex justify-start items-center gap-6 mt-2">
            <p className="flex-none text-nowrap font-medium w-16">1 Star</p>
            <Progress
              value={reviewsTotalNumber === 0 ? 0 : (reviewsNumber[4].number / reviewsTotalNumber) * 100}
              className="h-2"
            />
            <p className="flex-none text-nowrap w-12 text-center">
              {reviewsTotalNumber === 0 ? 0 : (reviewsNumber[4].number / reviewsTotalNumber) * 100} %
            </p>
          </div>
        </div>
      </div>
      <form ref={formRef} action={actionHandler}>
        <Textarea name="content" rows={5} placeholder="Write your review ..." className="mt-4 resize-none" />
        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="ml-1 text-sm">Select rating</p>
            <div className="mt-1 flex justify-start items-center gap-1">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className={`rounded-full size-9 ${
                  myRating === "1.0" ||
                  myRating === "2.0" ||
                  myRating === "3.0" ||
                  myRating === "4.0" ||
                  myRating === "5.0"
                    ? "bg-yellow-500 text-white hover:bg-yellow-500 hover:text-white"
                    : ""
                }`}
                onClick={() => (myRating !== "1.0" ? setMyRating("1.0") : setMyRating(""))}
              >
                <Star className="size-5" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className={`rounded-full size-9 ${
                  myRating === "2.0" || myRating === "3.0" || myRating === "4.0" || myRating === "5.0"
                    ? "bg-yellow-500 text-white hover:bg-yellow-500 hover:text-white"
                    : ""
                }`}
                onClick={() => (myRating !== "2.0" ? setMyRating("2.0") : setMyRating(""))}
              >
                <Star className="size-5" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className={`rounded-full size-9 ${
                  myRating === "3.0" || myRating === "4.0" || myRating === "5.0"
                    ? "bg-yellow-500 text-white hover:bg-yellow-500 hover:text-white"
                    : ""
                }`}
                onClick={() => (myRating !== "3.0" ? setMyRating("3.0") : setMyRating(""))}
              >
                <Star className="size-5" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className={`rounded-full size-9 ${
                  myRating === "4.0" || myRating === "5.0"
                    ? "bg-yellow-500 text-white hover:bg-yellow-500 hover:text-white"
                    : ""
                }`}
                onClick={() => (myRating !== "4.0" ? setMyRating("4.0") : setMyRating(""))}
              >
                <Star className="size-5" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className={`rounded-full size-9 ${
                  myRating === "5.0" ? "bg-yellow-500 text-white hover:bg-yellow-500 hover:text-white" : ""
                }`}
                onClick={() => (myRating !== "5.0" ? setMyRating("5.0") : setMyRating(""))}
              >
                <Star className="size-5" />
              </Button>
              <p className="ml-2">{myRating}</p>
            </div>
          </div>
          <Button>Add</Button>
        </div>
      </form>
      {reviews.map((review, index) => (
        <Review
          key={index}
          restaurantId={restaurantId}
          reviewId={review.id}
          profileImage={review.profileImage}
          username={review.username}
          rating={review.rating}
          content={review.content}
          isLiked={review.isLiked}
          likeNumber={review.likeNumber}
          replies={review.replies}
        />
      ))}
    </div>
  );
}
