"use server";

import { getSession } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import { IReviewLike, ReviewLike } from "@/models/reviewLike";
import { IUser, User } from "@/models/user";

export async function reviewLike(formData: FormData, reviewId: string) {
  try {
    await connectToDatabase();
    const session = await getSession();
    const user: IUser | null = await User.findById(session?.user.id);
    if (!session || user === null) return { success: false, message: "User not authenticated" };

    const reviewLike: IReviewLike | null = await ReviewLike.findOne({
      review: reviewId,
      user: user.id,
    });

    if (reviewLike) {
      await ReviewLike.deleteOne({
        review: reviewId,
        user: user.id,
      });
      return { success: true, message: "Review like removed successfully" };
    } else
      await ReviewLike.create({
        review: reviewId,
        user: user.id,
      });

    return { success: true, message: "Review liked successfully" };
  } catch (e) {
    return { success: false, message: "Something went wrong" };
  }
}
