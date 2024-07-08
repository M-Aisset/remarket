"use server";

import { getSession } from "@/lib/auth";
import { compress } from "@/lib/compress";
import connectToDatabase from "@/lib/mongodb";
import { utapi } from "@/lib/utapi";
import { IRestaurant, Restaurant } from "@/models/restaurant";
import { IUser, User } from "@/models/user";

export async function restaurantRegister(formData: FormData) {
  try {
    await connectToDatabase();
    const session = await getSession();
    const user: IUser | null = await User.findById(session?.user.id);
    if (!session || user === null) return { success: false, message: "User not authenticated" };

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      wilaya: formData.get("wilaya") as string,
      location: formData.get("location") as string,
      categories: formData.getAll("categories") as string[],
      offerings: formData.getAll("offerings") as string[],
      description: formData.get("description") as string,
      restaurantPhotos: await Promise.all((formData.getAll("restaurantPhotos") as File[]).map(compress)),
      popularDishesNames: formData.getAll("popularDishesNames") as string[],
      popularDishesPhotos: await Promise.all((formData.getAll("popularDishesPhotos") as File[]).map(compress)),
      popularDishesPrices: formData.getAll("popularDishesPrices") as string[],
      menuPhotos: await Promise.all((formData.getAll("menuPhotos") as File[]).map(compress)),
      fromHours: formData.getAll("fromHours") as string[],
      fromMinutes: formData.getAll("fromMinutes") as string[],
      toHours: formData.getAll("toHours") as string[],
      toMinutes: formData.getAll("toMinutes") as string[],
      isClosed: formData.getAll("isClosed") as string[],
    };

    const restaurantPhotosUrls: string[] = [];
    const responses1 = await utapi.uploadFiles(data.restaurantPhotos);
    for (const response of responses1) {
      if (!response.data) return { success: false, message: "Uploading error" };
      restaurantPhotosUrls.push(response.data.url);
    }

    const popularDishesPhotosUrls: string[] = [];
    const responses2 = await utapi.uploadFiles(data.popularDishesPhotos);
    for (const response of responses2) {
      if (!response.data) return { success: false, message: "Uploading error" };
      popularDishesPhotosUrls.push(response.data.url);
    }

    const menuPhotosUrls: string[] = [];
    const responses3 = await utapi.uploadFiles(data.menuPhotos);
    for (const response of responses3) {
      if (!response.data) return { success: false, message: "Uploading error" };
      menuPhotosUrls.push(response.data.url);
    }

    const popularDishes: { name: string; imageUrl: string; price: number }[] = [];
    for (let i = 0; i < data.popularDishesNames.length; i++) {
      popularDishes.push({
        name: data.popularDishesNames[i],
        imageUrl: popularDishesPhotosUrls[i],
        price: Number(data.popularDishesPrices[i]),
      });
    }

    const images: { imageUrl: string; isMain: boolean }[] = [];
    for (let i = 0; i < data.restaurantPhotos.length; i++) {
      images.push({
        imageUrl: restaurantPhotosUrls[i],
        isMain: i === 0 ? true : false,
      });
    }

    const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    const hours: { day: string; from: string; to: string; isClosed: boolean }[] = [];
    for (let i = 0; i < data.toHours.length; i++) {
      hours.push({
        day: days[i],
        from: `${Number(data.fromHours[i]) < 10 ? "0" + Number(data.fromHours[i]) : data.fromHours[i]}:${
          Number(data.fromMinutes[i]) < 10 ? "0" + Number(data.fromMinutes[i]) : data.fromMinutes[i]
        }`,
        to: `${Number(data.toHours[i]) < 10 ? "0" + Number(data.toHours[i]) : data.toHours[i]}:${
          Number(data.toMinutes[i]) < 10 ? "0" + Number(data.toMinutes[i]) : data.toMinutes[i]
        }`,
        isClosed: data.isClosed[i] === "true",
      });
    }

    const restaurant: IRestaurant = await Restaurant.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      wilaya: data.wilaya,
      address: data.address,
      location: data.location,
      categories: data.categories,
      offerings: data.offerings,
      description: data.description,
      menu: {
        menuPagesImageUrl: menuPhotosUrls,
        menuItems: popularDishes,
      },
      images: images,
      hours: hours,
      user: user._id,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    });
    return { success: true, message: "Registered successfully" };
  } catch (e) {
    return { success: false, message: "Something went wrong" };
  }
}
