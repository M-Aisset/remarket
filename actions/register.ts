"use server";

import { signIn } from "@/lib/auth";
import bcrypt from "bcrypt";
import connectToDatabase from "@/lib/mongodb";
import { IUser, User } from "@/models/user";

export async function register(formData: FormData) {
  try {
    const data = {
      fullName: formData.get("fullName") as string,
      userName: formData.get("userName") as string,
      wilaya: formData.get("wilaya") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      password: formData.get("password") as string,
      repeatPassword: formData.get("repeatPassword") as string,
    };

    await connectToDatabase();
    const hashedPassword = await bcrypt.hash(data.password, 15);
    const user: IUser = await User.create({
      fullName: data.fullName,
      userName: data.userName,
      profileImageUrl: "/blank-profile-img.png",
      wilaya: data.wilaya,
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    });
    await signIn(user.id);
    return { success: true, message: "Registered successfully" };
  } catch (e) {
    return { success: false, message: "Something went wrong" };
  }
}
