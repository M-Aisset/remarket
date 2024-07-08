"use server";

import { signIn } from "@/lib/auth";
import bcrypt from "bcrypt";
import connectToDatabase from "@/lib/mongodb";
import { IUser, User } from "@/models/user";

export async function signin(formData: FormData) {
  try {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    await connectToDatabase();

    const user: IUser | null = await User.findOne({ email: data.email });
    if (!user) return { success: false, message: "Email or password is incorrect" };

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) return { success: false, message: "Email or password is incorrect" };

    await signIn(user.id);
    return { success: true, message: "Signed in successfully" };
  } catch (e) {
    return { success: false, message: "Something went wrong" };
  }
}
