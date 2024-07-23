"use server";

import { getSession } from "@/lib/auth";
import { compress } from "@/lib/compress";
import connectToDatabase from "@/lib/mongodb";
import bcrypt from "bcrypt";
import { utapi } from "@/lib/utapi";
import { IUser, User } from "@/models/user";

function getFilenameFromUrl(url: string): string {
  const urlObj = new URL(url);

  const pathname = urlObj.pathname;

  const filename = pathname.split("/").pop();

  return filename ?? "";
}

export async function updateUser(formData: FormData) {
  try {
    const data = {
      fullName: formData.get("fullName") as string,
      userName: formData.get("userName") as string,
      profileImage: formData.get("profileImage") as File,
      wilaya: formData.get("wilaya") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      password: formData.get("password") as string,
    };

    await connectToDatabase();
    const session = await getSession();
    const user: IUser | null = await User.findById(session?.user.id);
    if (!session || user === null) return { success: false, message: "User not authenticated" };

    let newProfileImageUrl = user.profileImageUrl;
    if (data.profileImage) {
      if (user.profileImageUrl !== "/blank-profile-img.png") {
        await utapi.deleteFiles(getFilenameFromUrl(user.profileImageUrl));
      }
      const responses = await utapi.uploadFiles([await compress(data.profileImage, 320)]);
      if (!responses[0].data) return { success: false, message: "Uploading error" };
      newProfileImageUrl = responses[0].data.url;
    }

    if (!data.password && (data.email !== user.email || data.phone !== user.phone))
      return { success: false, message: "You need to enter the password to update email or phone" };
    else if (data.password && (data.email !== user.email || data.phone !== user.phone)) {
      const isValid = await bcrypt.compare(data.password, user.password);
      if (!isValid) return { success: false, message: "Password is incorrect" };
    }

    await User.findByIdAndUpdate(user._id, {
      fullName: data.fullName,
      userName: data.userName,
      profileImageUrl: newProfileImageUrl,
      wilaya: data.wilaya,
      email: data.email,
      phone: data.phone,
      updatedAt: new Date(Date.now()),
    });

    return { success: true, message: "User info Updated successfully" };
  } catch (e) {
    return { success: false, message: "Something went wrong" };
  }
}
