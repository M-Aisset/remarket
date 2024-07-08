import Restaurant from "@/components/restaurant";
import { getSession } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import { IRestaurant, Restaurant as RestaurantModel } from "@/models/restaurant";
import { IRestaurantLike, RestaurantLike } from "@/models/restaurantLike";
import { IReview, Review } from "@/models/review";
import { IUser, User } from "@/models/user";

export default async function SearchResult({
  searchParams,
}: {
  searchParams: {
    searchQuery: string | undefined;
    rating: string | undefined;
    categories: string | undefined;
    wilaya: string | undefined;
    offerings: string | undefined;
    sort: string | undefined;
  };
}) {
  const categoriesParam = searchParams.categories as string;
  let categoriesArray = categoriesParam.split(",");
  categoriesArray = categoriesArray.filter((e) => e !== "any");
  const wilayaParam = searchParams.wilaya as string;
  const offeringsParam = searchParams.offerings as string;
  let offeringsArray = offeringsParam.split(",");
  offeringsArray = offeringsArray.filter((e) => e !== "any" && e !== "Open Now");
  const searchQueryParam = searchParams.searchQuery as string;
  const ratingParam = searchParams.rating as string;
  const sortParam = searchParams.sort as string;

  const session = await getSession();
  await connectToDatabase();
  const user: IUser | null = await User.findById(session?.user.id);
  const restaurants: IRestaurant[] = await RestaurantModel.find({});

  const restaurantsNotF = await Promise.all(
    restaurants.map(async (restaurant) => {
      const reviews: IReview[] = await Review.find({ restaurant: restaurant.id, parent: null });
      const restaurantLike: IRestaurantLike | null = await RestaurantLike.findOne({
        restaurant: restaurant.id,
        user: user?.id,
      });

      const numericRatings = reviews
        .map((review) => (review.rating ? Number(review.rating) : null))
        .filter((rating) => rating !== null) as number[];

      const averageRating =
        numericRatings.length > 0
          ? (numericRatings.reduce((acc, rating) => acc + rating, 0) / numericRatings.length).toFixed(1)
          : "N/A";

      return {
        id: restaurant.id,
        name: restaurant.name,
        wilaya: restaurant.wilaya,
        image: restaurant.images[0].imageUrl,
        categories: restaurant.categories,
        offerings: restaurant.offerings,
        rating: averageRating,
        reviewsTotalNumber: reviews.length,
        isLiked: restaurantLike !== null,
        hours: restaurant.hours,
      };
    })
  );

  const restaurantsF = restaurantsNotF.filter(
    (restaurant) =>
      (Math.round(Number(restaurant.rating)) === Number(ratingParam) || ratingParam === "any") &&
      restaurant.name.toLowerCase().includes(searchQueryParam.toLowerCase()) &&
      (restaurant.wilaya.toLowerCase() === wilayaParam.toLowerCase() || wilayaParam === "any") &&
      (categoriesArray.every((element) => restaurant.categories.includes(element)) ||
        categoriesArray.length === 0) &&
      (offeringsArray.every((element) => restaurant.offerings.includes(element)) || offeringsArray.length === 0)
  );
  return (
    <div className="mt-8 grid sm:grid-cols-2 gap-4">
      {restaurantsF.map((restaurant, index) => (
        <Restaurant
          key={index}
          id={restaurant.id}
          name={restaurant.name}
          rating={restaurant.rating}
          image={restaurant.image}
          reviewsTotalNumber={restaurant.reviewsTotalNumber}
          wilaya={restaurant.wilaya}
          isLiked={restaurant.isLiked}
          hours={restaurant.hours}
        />
      ))}
    </div>
  );
}
