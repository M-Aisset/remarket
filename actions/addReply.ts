"use server";

import { getSession } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import { IReview, Review } from "@/models/review";
import { IUser, User } from "@/models/user";
import { revalidatePath } from "next/cache";

export async function addReply(formData: FormData, restaurantId: string, parentId: string) {
  try {
    const data = { content: formData.get("content") as string };
    await connectToDatabase();
    const session = await getSession();
    const user: IUser | null = await User.findById(session?.user.id);
    if (!session || user === null) return { success: false, message: "User not authenticated" };

    await Review.create({
      rating: null,
      content: data.content,
      parent: parentId,
      user: user.id,
      restaurant: restaurantId,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    });
    revalidatePath("/restaurant");
    return { success: true, message: "Reply posted successfully" };
  } catch (e) {
    return { success: false, message: "Something went wrong" };
  }
}
