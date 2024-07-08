"use server";

import { signOut } from "@/lib/auth";

export async function signout(formData: FormData) {
  try {
    await signOut();
    return { success: true, message: "Signed out successfully" };
  } catch (e) {
    return { success: false, message: "Something went wrong" };
  }
}
