import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Images, MapPin, MoreVertical, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import PopularDishes from "@/components/pages/restaurant/popularDishes";
import HoursAndLocation from "@/components/pages/restaurant/hoursAndLocation";
import RestaurantLikeButton from "@/components/restaurantLikeButton";
import RatingAndReview from "@/components/pages/restaurant/ratingAndReview";
import connectToDatabase from "@/lib/mongodb";
import { IUser, User } from "@/models/user";
import { getSession } from "@/lib/auth";
import { IRestaurant, Restaurant as RestaurantModel } from "@/models/restaurant";
import { notFound } from "next/navigation";
import { IReview, Review } from "@/models/review";
import { IRestaurantLike, RestaurantLike } from "@/models/restaurantLike";
import { IReviewLike, ReviewLike } from "@/models/reviewLike";
import mongoose from "mongoose";

export default async function Restaurant({ params }: { params: { restaurantId: string } }) {
  const session = await getSession();
  await connectToDatabase();
  const user: IUser | null = await User.findById(session?.user.id);

  if (!mongoose.Types.ObjectId.isValid(params.restaurantId)) notFound();

  const restaurantDb: IRestaurant | null = await RestaurantModel.findById(params.restaurantId).populate("user");

  if (!restaurantDb) notFound();

  const reviewsDb: IReview[] = await Review.find({ restaurant: restaurantDb.id }).populate("user");
  const reviewsDbParents = reviewsDb.filter((review) => review.parent === null);

  const numericRatings = reviewsDbParents
    .map((review) => (review.rating ? Number(review.rating) : null))
    .filter((rating) => rating !== null) as number[];

  const averageRating =
    numericRatings.length > 0
      ? (numericRatings.reduce((acc, rating) => acc + rating, 0) / numericRatings.length).toFixed(1)
      : "N/A";

  const restaurantLike: IRestaurantLike | null = await RestaurantLike.findOne({
    restaurant: restaurantDb.id,
    user: user?.id,
  });

  const starCounts = Array(5).fill(0);
  reviewsDbParents.forEach((review) => {
    if (review.rating) {
      const rating = Number(review.rating);
      if (rating >= 1 && rating <= 5) {
        starCounts[rating - 1]++;
      }
    }
  });

  const reviews = await Promise.all(
    reviewsDbParents.map(async (reviewParent) => {
      const reviewLike: IReviewLike | null = await ReviewLike.findOne({
        review: reviewParent.id,
        user: user?.id,
      });
      const reviewLikes = await ReviewLike.countDocuments({ review: reviewParent.id });

      const replies = await Promise.all(
        reviewsDb
          .filter((review) => review.parent?.toString() === reviewParent.id)
          .map(async (reply) => {
            const replyLike: IReviewLike | null = await ReviewLike.findOne({
              review: reply.id,
              user: user?.id,
            });
            const replyLikes = await ReviewLike.countDocuments({ review: reply.id });

            return {
              id: reply.id as string,
              profileImage: (reply.user as IUser).profileImageUrl,
              username: (reply.user as IUser).userName,
              content: reply.content,
              isLiked: replyLike !== null,
              likeNumber: replyLikes,
            };
          })
      );

      return {
        id: reviewParent.id as string,
        profileImage: (reviewParent.user as IUser).profileImageUrl,
        username: (reviewParent.user as IUser).userName,
        rating: reviewParent.rating as string,
        content: reviewParent.content,
        isLiked: reviewLike !== null,
        likeNumber: reviewLikes,
        replies: replies,
      };
    })
  );

  const restaurant = {
    id: restaurantDb.id,
    userName: (restaurantDb.user as IUser).userName,
    profileImage: (restaurantDb.user as IUser).profileImageUrl,
    name: restaurantDb.name,
    address: restaurantDb.address,
    wilaya: restaurantDb.wilaya,
    location: restaurantDb.location,
    restaurantImagesUrls: restaurantDb.images.map((image) => {
      return image.imageUrl;
    }),
    mainImageUrl: restaurantDb.images.find((image) => image.isMain)!.imageUrl,
    menuPagesImageUrl: restaurantDb.menu.menuPagesImageUrl,
    isLiked: restaurantLike !== null,
    rating: averageRating,
    reviewsTotalNumber: numericRatings.length,
    reviewsNumber: [
      { stars: 5, number: starCounts[4] },
      { stars: 4, number: starCounts[3] },
      { stars: 3, number: starCounts[2] },
      { stars: 2, number: starCounts[1] },
      { stars: 1, number: starCounts[0] },
    ],
    reviews: reviews,
    categories: restaurantDb.categories,
    popularDishes: restaurantDb.menu.menuItems,
    hours: restaurantDb.hours,
  };
  return (
    <div>
      <div className="dark:bg-dot-white/[0.2] bg-dot-black/[0.22]">
        <div className="sm:px-4 pt-6">
          <div className="relative w-full h-[20rem] overflow-hidden sm:rounded-lg sm:border border-y">
            <Image
              src={restaurant.mainImageUrl}
              alt="Banner image"
              className="object-cover sm:rounded-lg"
              height={0}
              width={0}
              sizes="100vw"
              style={{ width: "100%", height: "100%" }}
            />
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="absolute top-3 right-3 backdrop-blur-lg bg-background/75">
                  <Images className="mr-2" />
                  Restaurant photos
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl p-2">
                <DialogTitle className="text-3xl">Restaurant photos</DialogTitle>
                <div className="h-80 overflow-y-auto">
                  {restaurant.restaurantImagesUrls.map((restaurantImageUrl, index) => (
                    <div key={index}>
                      <Image
                        height={0}
                        width={0}
                        quality={50}
                        sizes="100vw"
                        style={{ width: "100%", height: "auto" }}
                        src={restaurantImageUrl}
                        alt="Menu page"
                        className="mt-3"
                      />
                      <p className="pt-2 text-center">
                        Photo {index + 1} / {restaurant.restaurantImagesUrls.length}
                      </p>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="py-6 md:px-20 px-4 border-b">
          <div className="w-full">
            <p className="text-sm text-muted-foreground flex justify-start items-center gap-0.5">
              <MapPin className="size-4" />
              {restaurant.wilaya}
            </p>
            <div className="w-full flex justify-between items-start gap-2">
              <div className="flex justify-start items-center gap-3 flex-wrap">
                <p className="text-4xl font-semibold">{restaurant.name}</p>
                <div className="flex justify-start items-center gap-1">
                  <Star className="size-6 rounded-full bg-yellow-500 text-white p-1" />
                  <span className="text-sm">{restaurant.rating}</span>
                </div>
              </div>
              <div className="flex justify-center items-center gap-3">
                <span className="w-px h-7 bg-border mr-3"></span>
                <RestaurantLikeButton restaurantId={restaurant.id} initialIsLiked={restaurant.isLiked} />
                <Button variant="outline" size="icon" className="rounded-full size-9">
                  <MoreVertical />
                </Button>
              </div>
            </div>
            <div className="mt-3 w-full flex justify-start items-center gap-2 overflow-x-auto">
              {restaurant.categories.map((category, index) => (
                <div key={index} className="flex-none border border-primary px-2 py-0.5 rounded-md bg-background">
                  {category}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="md:px-20 px-4">
        <PopularDishes popularDishes={restaurant.popularDishes} menuPagesImageUrl={restaurant.menuPagesImageUrl} />
        <HoursAndLocation
          hours={restaurant.hours}
          address={restaurant.address}
          wilaya={restaurant.wilaya}
          location={restaurant.location}
        />
        <RatingAndReview
          restaurantId={params.restaurantId}
          rating={restaurant.rating}
          reviewsTotalNumber={restaurant.reviewsTotalNumber}
          reviewsNumber={restaurant.reviewsNumber}
          reviews={restaurant.reviews}
        />
      </div>
    </div>
  );
}
