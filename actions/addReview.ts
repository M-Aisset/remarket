"use server";

import { getSession } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import { IReview, Review } from "@/models/review";
import { IUser, User } from "@/models/user";
import { revalidatePath } from "next/cache";

export async function addReview(formData: FormData, restaurantId: string) {
  try {
    const data = { content: formData.get("content") as string, rating: formData.get("rating") as string };
    await connectToDatabase();
    const session = await getSession();
    const user: IUser | null = await User.findById(session?.user.id);
    if (!session || user === null) return { success: false, message: "User not authenticated" };

    const review: IReview | null = await Review.findOne({ user: user.id, parent: null });

    if (review) return { success: false, message: "User has already a review" };

    await Review.create({
      rating: data.rating,
      content: data.content,
      parent: null,
      user: user.id,
      restaurant: restaurantId,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    });
    revalidatePath("/restaurant");
    return { success: true, message: "Review posted successfully" };
  } catch (e) {
    return { success: false, message: "Something went wrong" };
  }
}
