"use server";

import { getSession } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import { IRestaurantLike, RestaurantLike } from "@/models/restaurantLike";
import { IUser, User } from "@/models/user";

export async function restaurantLike(formData: FormData, restaurantId: string) {
  try {
    await connectToDatabase();
    const session = await getSession();
    const user: IUser | null = await User.findById(session?.user.id);
    if (!session || user === null) return { success: false, message: "User not authenticated" };

    const restaurantLike: IRestaurantLike | null = await RestaurantLike.findOne({
      restaurant: restaurantId,
      user: user.id,
    });

    if (restaurantLike)
      await RestaurantLike.deleteOne({
        restaurant: restaurantId,
        user: user.id,
      });
    else
      await RestaurantLike.create({
        restaurant: restaurantId,
        user: user.id,
      });

    return { success: true, message: "Restaurant liked or remove like successfully" };
  } catch (e) {
    return { success: false, message: "Something went wrong" };
  }
}
